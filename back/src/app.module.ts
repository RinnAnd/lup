import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserUseCase } from './contexts/user/application/create-user/create-user.use-case';
import { DeleteUserUseCase } from './contexts/user/application/delete-user/delete-user.use-case';
import { GetUserUseCase } from './contexts/user/application/get-user/get-user.use-case';
import { UpdateUserUseCase } from './contexts/user/application/update-user/update-user.use-case';
import { UserController } from './contexts/user/infrastructure/http/user.controller';
import { UserRepositoryImpl } from './contexts/user/infrastructure/repositories/user-respository.impl';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './contexts/user/domain/entities/user.entity';
import { DatabaseProviders } from './contexts/shared/infrastructure/database/database.providers';
import { Todo } from './contexts/todo/domain/entities/todo.entity';
import { TodoController } from './contexts/todo/infrastructure/http/todo.controller';
import { TodoRepositoryImpl } from './contexts/todo/infrastructure/repositories/todo-repository.impl';
import { CreateTodoUseCase } from './contexts/todo/application/create-todo/create-todo.use-case';
import { GetTodoByUserIdUseCase } from './contexts/todo/application/get-todo-by-user-id/get-todo-by-user-id.use-case';
import { UpdateTodoUseCase } from './contexts/todo/application/update-todo/update-todo.use-case';
import { DeleteTodoUseCase } from './contexts/todo/application/delete-todo/delete-todo.use-case';
import { LoginUseCase } from './contexts/auth/application/login/login.use-case';
import { AuthController } from './contexts/auth/infrastructure/http/auth.controller';
import { AuthRepositoryImpl } from './contexts/auth/infrastructure/repositories/auth-repository.impl';
import { AuthModule } from './contexts/auth/auth.module';
import { JwtService } from './contexts/auth/application/jwt/jwt.service';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([User, Todo]),
    AuthModule,
    ...DatabaseProviders,
  ],
  controllers: [AppController, UserController, TodoController, AuthController],
  providers: [
    AppService,
    UserRepositoryImpl,
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    TodoRepositoryImpl,
    CreateTodoUseCase,
    GetTodoByUserIdUseCase,
    UpdateTodoUseCase,
    DeleteTodoUseCase,
    AuthRepositoryImpl,
    LoginUseCase,
    JwtService,
    NestJwtService,
  ],
})
export class AppModule {}
