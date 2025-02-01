import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponseDto } from 'src/contexts/shared/interfaces/dto/api-response.dto';
import { PasswordUtils } from 'src/contexts/shared/utils/passwords.util';
import { User } from 'src/contexts/user/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../../application/login/login.dto';
import { Session } from '../../domain/entities/session.entity';
import { AuthRepository } from '../../domain/repository/auth.repository';
import { JwtService } from '../../application/jwt/jwt.service';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto): Promise<ApiResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: loginData.email },
    });
    if (!user) {
      return {
        message: 'No user with this email exists',
        error: 'incorrect email',
        statusCode: 404,
      };
    }

    const isPasswordCorrect = await PasswordUtils.comparePassword(
      loginData.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return {
        message: 'Password is incorrect',
        error: 'invalid credentials',
        statusCode: 400,
      };
    }

    const token = this.jwtService.generateToken({
      id: user.id,
      email: user.email,
    });

    const data: Session = {
      id: user.id,
      name: user.name,
      token,
      createdAt: new Date(),
    };

    return {
      message: 'Logged in successfully',
      data,
      statusCode: 201,
    };
  }
}
