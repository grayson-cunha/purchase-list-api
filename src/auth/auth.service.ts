import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(user: User) {
    const { password } = user;
    const salt = 8;

    const hash = await bcrypt.hash(password, salt);

    const { email, id, created_at } = await this.userService.create({ ...user, password: hash });

    return { id, email, created_at };
  }
}
