import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';
import { CreateUserDto } from '../../application/create-user/create-user.dto';
import { UpdateUserDto } from '../../application/update-user/update-user.dto';

export interface UserRepository {
  create(user: CreateUserDto): Promise<ApiResponseDto>;
  getByEmail(email: string): Promise<ApiResponseDto>;
  update(id: string, user: UpdateUserDto): Promise<ApiResponseDto>;
  delete(id: string): Promise<ApiResponseDto>;
}
