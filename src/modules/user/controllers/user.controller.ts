import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserService } from '../services/user.service';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/not-admin')
  async getAllByIsNotAdmin() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('/admin')
  async getAllByIsAdmin() {
    return this.userService.findAll();
  }

}
