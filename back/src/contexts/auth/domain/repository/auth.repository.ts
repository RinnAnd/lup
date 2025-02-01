import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';
import { LoginDto } from '../../application/login/login.dto';

export interface AuthRepository {
  login(loginData: LoginDto): Promise<ApiResponseDto>;
}
