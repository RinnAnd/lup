import { HttpException, Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user-respository.impl';
import { UpdateUserDto } from './update-user.dto';
import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';
import { PasswordUtils } from 'src/contexts/shared/utils/passwords.util';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryImpl) {}
  async execute(id: string, user: UpdateUserDto): Promise<ApiResponseDto> {
    if (user.password) {
      user.password = await PasswordUtils.hashPassword(user.password);
    }
    const res = await this.userRepository.update(id, user);
    if (res.error) {
      throw new HttpException(res.message, res.statusCode);
    }
    return res;
  }
}
