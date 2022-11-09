import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: User) {
    return this.authService.signup(body);
  }
}
