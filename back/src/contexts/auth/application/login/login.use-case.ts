import { HttpException, Injectable } from '@nestjs/common';
import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';
import { LoginDto } from './login.dto';
import { AuthRepositoryImpl } from '../../infrastructure/repositories/auth-repository.impl';

@Injectable()
export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepositoryImpl) {}

  async execute(data: LoginDto): Promise<ApiResponseDto> {
    const res = await this.authRepository.login(data);
    if (res.error) {
      throw new HttpException(res.message, res.statusCode);
    }
    return res;
  }
}
