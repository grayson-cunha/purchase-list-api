import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(newUser: User) {
    const user = await this.findByEmail(newUser.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return this.userRepository.save(newUser);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
