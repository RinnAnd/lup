import { HttpException, Injectable } from '@nestjs/common';
import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user-respository.impl';
import { CreateUserDto } from './create-user.dto';
import { PasswordUtils } from 'src/contexts/shared/utils/passwords.util';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  async execute(user: CreateUserDto): Promise<ApiResponseDto> {
    const hashedPassword = await PasswordUtils.hashPassword(user.password);
    const res = await this.userRepository.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });
    if (res.error) {
      throw new HttpException(res.message, res.statusCode);
    }
    return res;
  }
}
