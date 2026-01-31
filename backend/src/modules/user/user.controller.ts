import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuards } from '../guards/auth.guard';

@ApiTags('User')
@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuards)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  list() {
    return this.userService.list();
  }
}
