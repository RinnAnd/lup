import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';
import { CreateTodoDto } from '../../application/create-todo/create-todo.dto';
import { UpdateTodoDto } from '../../application/update-todo/update-todo.dto';

export interface TodoRepository {
  create(todo: CreateTodoDto): Promise<ApiResponseDto>;
  getByUserId(id: string): Promise<ApiResponseDto>;
  update(id: string, todo: UpdateTodoDto): Promise<ApiResponseDto>;
  delete(id: string): Promise<ApiResponseDto>;
}
