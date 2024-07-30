import { UserRoles } from './user-roles';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createPartnerUser(data: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        roles: [UserRoles.PARTNER],
        password: this.generateHash(data.password),
      },
    });

    return user;
  }

  async createCommonUser(data: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        roles: [UserRoles.USER],
        password: this.generateHash(data.password),
      },
    });

    return user;
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  async findOne(idOrEmail: number | string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        ...(typeof idOrEmail === 'number'
          ? { id: idOrEmail }
          : { email: idOrEmail }),
      },
    });

    return user;
  }
}
