import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PartnersService {
  constructor(private prismaService: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto & { userId: number }) {
    const partner = this.prismaService.$transaction(async (prisma) => {
      const partner = await prisma.partner.create({
        data: {
          name: createPartnerDto.name,
        },
      });

      await prisma.partnerUser.create({
        data: {
          partnerId: partner.id,
          userId: createPartnerDto.userId,
        },
      });
    });

    return partner;
  }

  findAll() {
    return this.prismaService.partner.findMany({
      include: {
        PartnerUser: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} partner`;
  }

  update(id: number, updatePartnerDto: UpdatePartnerDto) {
    return `This action updates a #${id} partner`;
  }

  remove(id: number) {
    return `This action removes a #${id} partner`;
  }
}
