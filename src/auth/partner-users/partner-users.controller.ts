import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { UserPresenter } from '../users/user.presenter';

@Controller('partner/users')
export class PartnerUsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.createCommonUser(data);

    return new UserPresenter(user);
  }
}
