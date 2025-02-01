import { HttpException, Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user-respository.impl';
import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  async execute(email: string): Promise<ApiResponseDto> {
    const res = await this.userRepository.getByEmail(email);
    if (res.error) {
      throw new HttpException(res.message, res.statusCode);
    }
    return res;
  }
}
