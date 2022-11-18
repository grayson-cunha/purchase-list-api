import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async signup(user: User) {
    const { password } = user;
    const salt = 8;

    const hash = await bcrypt.hash(password, salt);

    const { email, id, created_at } = await this.userService.create({ ...user, password: hash });

    return { id, email, created_at };
  }

  async signin(user: User) {
    const { email, password } = user;

    const { id, password: hashed_password } = await this.userService.findByEmail(email);

    const isMatch = await bcrypt.compare(password, hashed_password);

    if (!isMatch) {
      throw new BadRequestException('Wrong email or password');
    }

    return {
      access_token: this.jwtService.sign({ id, email }),
      expires_in: '3600s',
    };
  }
}
