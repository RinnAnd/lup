import { HttpException, Injectable } from '@nestjs/common';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo-repository.impl';
import { UpdateTodoDto } from './update-todo.dto';

@Injectable()
export class UpdateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepositoryImpl) {}

  async execute(id: string, todo: UpdateTodoDto) {
    const res = await this.todoRepository.update(id, todo);
    if (res.error) {
      throw new HttpException(res.message, res.statusCode);
    }
    return res;
  }
}
