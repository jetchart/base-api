import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserCredentialDto } from './user-credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/google/login')
  async login(@Body('token') token: string): Promise<UserCredentialDto> {
    return await this.authService.login(token);
  }

    @Get('/google/login')
  async test(): Promise<string> {
    return 'Ok!';
  }
}
