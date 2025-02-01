import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../../application/create-user/create-user.dto';
import { CreateUserUseCase } from '../../application/create-user/create-user.use-case';
import { DeleteUserUseCase } from '../../application/delete-user/delete-user.use-case';
import { GetUserUseCase } from '../../application/get-user/get-user.use-case';
import { UpdateUserDto } from '../../application/update-user/update-user.dto';
import { UpdateUserUseCase } from '../../application/update-user/update-user.use-case';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.createUserUseCase.execute(user);
  }

  @Get()
  async get(@Query('email') email: string) {
    return await this.getUserUseCase.execute(email);
  }

  @Put()
  async update(@Query('id') id: string, @Body() user: UpdateUserDto) {
    return await this.updateUserUseCase.execute(id, user);
  }

  @Delete()
  async delete(@Query('id') id: string) {
    return await this.deleteUserUseCase.execute(id);
  }
}
