import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.userService.findOne(data.email);

    if (!user || !bcrypt.compareSync(data.password, user?.password)) {
      throw new Error('Invalid credentials');
    }

    const { password, ...rest } = user;

    return {
      access_token: this.jwtService.sign(rest),
    };
  }
}
