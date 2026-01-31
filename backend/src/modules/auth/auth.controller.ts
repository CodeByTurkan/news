import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  signin(@Body() signInDto: AuthSignInDto) {
    return this.authService.signin(signInDto);
  }

  @Post('/register')
  register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }
}
