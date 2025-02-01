import { UserRepository } from '../../domain/repository/user.repository';
import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';
import { CreateUserDto } from '../../application/create-user/create-user.dto';
import { UpdateUserDto } from '../../application/update-user/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  async create(user: CreateUserDto): Promise<ApiResponseDto> {
    try {
      const exists = await this.getByEmail(user.email);
      if (exists.data) {
        return {
          error: 'User already exists',
          message: 'User already exists',
          statusCode: 409,
        };
      }
      const newUser = this.repository.save(user);
      return {
        data: newUser,
        message: 'User created successfully',
        statusCode: 201,
      };
    } catch (error) {
      return {
        message: error.message,
        error: "User couldn't be created",
        statusCode: 500,
      };
    }
  }
  async getByEmail(email: string): Promise<ApiResponseDto> {
    try {
      const user = await this.repository.findOne({ where: { email } });
      if (!user) {
        return {
          error: 'User not found',
          message: 'User not found',
          statusCode: 404,
        };
      }
      return {
        data: user,
        message: 'User found',
        statusCode: 200,
      };
    } catch (error) {
      return {
        error: error.message,
        message: "User couldn't be found",
        statusCode: 500,
      };
    }
  }

  async update(id: string, user: UpdateUserDto): Promise<ApiResponseDto> {
    try {
      const res = await this.repository.update(id, user);
      if (res.affected === 0) {
        return {
          error: 'User not found',
          message: 'User not found',
          statusCode: 404,
        };
      }
      return {
        message: 'User updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      return {
        error: error.message,
        message: "User couldn't be updated",
        statusCode: 500,
      };
    }
  }
  async delete(id: string): Promise<ApiResponseDto> {
    try {
      const res = await this.repository.delete(id);
      if (res.affected === 0) {
        return {
          error: 'User not found',
          message: 'User not found',
          statusCode: 404,
        };
      }
      return {
        message: 'User deleted successfully',
        statusCode: 200,
      };
    } catch (error) {
      return {
        error: error.message,
        message: "User couldn't be deleted",
        statusCode: 500,
      };
    }
  }
}
