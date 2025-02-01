import { HttpException, Injectable } from '@nestjs/common';
import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user-respository.impl';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  async execute(id: string): Promise<ApiResponseDto> {
    const res = await this.userRepository.delete(id);
    if (res.error) {
      throw new HttpException(res.message, res.statusCode);
    }
    return res;
  }
}
