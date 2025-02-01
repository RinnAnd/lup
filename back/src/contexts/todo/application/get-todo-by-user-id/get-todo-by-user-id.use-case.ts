import { HttpException, Injectable } from '@nestjs/common';
import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo-repository.impl';

@Injectable()
export class GetTodoByUserIdUseCase {
  constructor(private readonly todoRepository: TodoRepositoryImpl) {}

  async execute(userId: string): Promise<ApiResponseDto> {
    const res = await this.todoRepository.getByUserId(userId);
    if (res.error) {
      throw new HttpException(res.message, res.statusCode);
    }
    return res;
  }
}
