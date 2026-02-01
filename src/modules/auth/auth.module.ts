import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppLoggerModule } from '../app-logger/app-logger.module';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import type { AppConfiguration } from '../../config/configuration.interface';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfiguration>) => ({
        secret: configService.getOrThrow('jwt.secret', { infer: true }),
        signOptions: { expiresIn: '7d' },
      }),
    }),
    UserModule,
    AppLoggerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
