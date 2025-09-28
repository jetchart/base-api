import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './user.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'THE_SECRET',
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService],
})
export class AuthModule {}
