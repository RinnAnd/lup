import { HttpException, Injectable } from '@nestjs/common';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo-repository.impl';
import { CreateTodoDto } from './create-todo.dto';

@Injectable()
export class CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepositoryImpl) {}

  async execute(todo: CreateTodoDto) {
    const now = new Date();
    const res = await this.todoRepository.create({
      ...todo,
      isCompleted: false,
      createdAt: now.toISOString(),
    });
    if (res.error) {
      throw new HttpException(res.message, res.statusCode);
    }
    return res;
  }
}
