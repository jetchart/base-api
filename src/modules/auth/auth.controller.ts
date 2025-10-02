import { Controller, Post, Body } from '@nestjs/common';
import { UserCredentialDto } from './user-credential.dto';
import { AuthService } from './auth.service';
import { AppLogger } from '../app-logger/app-logger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: AppLogger,
  ) {}

  @Post('/google/login')
  async login(@Body('token') token: string): Promise<UserCredentialDto> {
    const logContext = `${this.constructor.name}::login`;
    this.logger.logInfo(logContext, 'Trying to log in with Google token');
    const response = await this.authService.login(token);
    this.logger.logInfo(logContext, 'Login successful', {
      email: response.email,
    });
    return response;
  }
}
