import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../domain/repository/todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../../domain/entities/todo.entity';
import { Repository } from 'typeorm';
import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';
import { CreateTodoDto } from '../../application/create-todo/create-todo.dto';
import { UpdateTodoDto } from '../../application/update-todo/update-todo.dto';
import { User } from 'src/contexts/user/domain/entities/user.entity';

@Injectable()
export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(todo: CreateTodoDto): Promise<ApiResponseDto> {
    try {
      const newTodo = await this.todoRepository.save(todo);
      return {
        data: newTodo,
        message: 'To-do created successfully',
        statusCode: 201,
      };
    } catch (error) {
      return {
        message: error.message,
        error: "To-do couldn't be created",
        statusCode: 500,
      };
    }
  }

  async getByUserId(id: string): Promise<ApiResponseDto> {
    try {
      const todos = await this.todoRepository.findBy({ user: { id } });
      return {
        data: todos,
        message: 'To-dos found',
        statusCode: 200,
      };
    } catch (error) {
      console.log('error', error);
      return {
        error: error.message,
        message: "To-dos couldn't be found",
        statusCode: 500,
      };
    }
  }

  async update(id: string, todo: UpdateTodoDto): Promise<ApiResponseDto> {
    try {
      await this.todoRepository.update(id, todo);
      return {
        message: 'To-do updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      return {
        message: error.message,
        error: "To-do couldn't be updated",
        statusCode: 500,
      };
    }
  }

  async delete(id: string): Promise<ApiResponseDto> {
    try {
      const res = await this.todoRepository.delete(id);
      if (res.affected === 0) {
        return {
          error: 'To-do not found',
          message: 'To-do not found',
          statusCode: 404,
        };
      }
      return {
        message: 'To-do deleted successfully',
        statusCode: 200,
      };
    } catch (error) {
      return {
        message: error.message,
        error: "To-do couldn't be deleted",
        statusCode: 500,
      };
    }
  }
}
