import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserCredentialDto } from './user-credential.dto';
import { AuthService } from './auth.service';
import { PinoLogger } from 'nestjs-pino';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly logger: PinoLogger
  ) {}

  @Post('/google/login')
  async login(@Body('token') token: string): Promise<UserCredentialDto> {
    const logLocation = `${this.constructor.name}::login`;
    this.logger.info({logLocation, ...{token}}, 'Trying to log in with Google token');
    return await this.authService.login(token);
  }
}
