import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TenantService } from 'src/tenant/tenant.service';

@Injectable()
export class EventsService {
  constructor(
    private prismaService: PrismaService,
    private tenantService: TenantService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = await this.prismaService.event.create({
      data: {
        name: createEventDto.name,
        date: new Date(createEventDto.date),
        description: createEventDto.description,
        partnerId: this.tenantService.getTenant().id,
      },
    });

    return event;
  }

  async findAll() {
    const events = await this.prismaService.event.findMany({
      where: {
        partnerId: this.tenantService.getTenant().id,
      },
    });

    return events;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
