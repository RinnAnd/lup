import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';
import { CreateTodoDto } from '../../application/create-todo/create-todo.dto';
import { DeleteTodoUseCase } from '../../application/delete-todo/delete-todo.use-case';
import { GetTodoByUserIdUseCase } from '../../application/get-todo-by-user-id/get-todo-by-user-id.use-case';
import { UpdateTodoUseCase } from '../../application/update-todo/update-todo.use-case';
import { UpdateTodoDto } from '../../application/update-todo/update-todo.dto';
import { CreateTodoUseCase } from '../../application/create-todo/create-todo.use-case';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/contexts/shared/guards/jwt.guard';


@Controller('todo')
export class TodoController {
  constructor(
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly getTodoByUserIdUseCase: GetTodoByUserIdUseCase,
    private readonly updateTodoUseCase: UpdateTodoUseCase,
    private readonly deleteTodoUseCase: DeleteTodoUseCase,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() todo: CreateTodoDto): Promise<ApiResponseDto> {
    return await this.createTodoUseCase.execute(todo);
  }

  @Get() 
  @UseGuards(JwtGuard)
  async getByUserId(@Query('id') id: string): Promise<ApiResponseDto> {
    return this.getTodoByUserIdUseCase.execute(id);
  }

  @Put()
  @UseGuards(JwtGuard)
  async update(
    @Query('id') id: string,
    @Body() todo: UpdateTodoDto,
  ): Promise<ApiResponseDto> {
    return this.updateTodoUseCase.execute(id, todo);
  }

  @Delete()
  @UseGuards(JwtGuard)
  async delete(@Query('id') id: string): Promise<ApiResponseDto> {
    return this.deleteTodoUseCase.execute(id);
  }
}
