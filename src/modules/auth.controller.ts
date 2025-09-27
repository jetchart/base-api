import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './user-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/google/login')
  async login(@Body('token') token: string): Promise<UserCredentialDto> {
    return await this.authService.login(token);
  }
}
