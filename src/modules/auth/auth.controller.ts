import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserCredentialDto } from './user-credential.dto';
import { AuthService } from './auth.service';
import { AppLogger } from '../app-logger/app-logger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(this.constructor.name);
  }

  @Post('/google/login')
  async login(@Body('token') token: string): Promise<UserCredentialDto> {
    this.logger.info('Trying to log in with Google token');
    const response = await this.authService.login(token);
    this.logger.success('Login successful', { email: response.email });
    return response;
  }
}
