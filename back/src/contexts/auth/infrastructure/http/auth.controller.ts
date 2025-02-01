import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponseDto } from '../../../shared/interfaces/dto/api-response.dto';
import { LoginDto } from '../../application/login/login.dto';
import { LoginUseCase } from '../../application/login/login.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() data: LoginDto): Promise<ApiResponseDto> {
    return this.loginUseCase.execute(data);
  }
}
