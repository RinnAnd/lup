import { HttpException, Injectable } from '@nestjs/common';
import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo-repository.impl';

@Injectable()
export class DeleteTodoUseCase {
  constructor(private readonly todoRepository: TodoRepositoryImpl) {}

  async execute(id: string): Promise<ApiResponseDto> {
    const res = await this.todoRepository.delete(id);
    if (res.error) {
      throw new HttpException(res.message, res.statusCode);
    }
    return res;
  }
}
