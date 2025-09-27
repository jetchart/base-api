import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {
    const googleClientId = this.configService.get<string>('google.clientId');
    this.client = new OAuth2Client(googleClientId);
  }

  async login(id_token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: id_token,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new UnauthorizedException('Invalid Google token');

    const existingUser = await this.userService.findByEmail(payload.email!);
    const persistedUser = existingUser
      ? existingUser
      : await this.userService.create({
          email: payload.email,
          name: payload.name,
        });

    const access_token = this.jwtService.sign({ sub: persistedUser.email });
    return { access_token, user: { email: persistedUser.email, name: persistedUser.name } };
  }
}
