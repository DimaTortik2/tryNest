import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  async findOne(findId: number) {
    console.log(findId);

    const user = await this.prisma.user.findFirst({
      where: {
        id: findId,
      },
    });

    if (!user) {
      throw new BadRequestException('ай-яй-яй');
    }

    return user.name;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async register(registerName: string) {
    const user = await this.prisma.user.create({
      data: {
        name: registerName,
      },
    });
    return user;
  }

  async delete(deleteId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: deleteId,
      },
    });

    if (!user) {
      throw new BadRequestException('ай-яй-яй');
    }

    const answer = await this.prisma.user.delete({
      where: {
        id: deleteId,
      },
    });
    return answer;
  }

  async update(userDto: UserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userDto.id,
      },
    });

    if (!user) {
      throw new BadRequestException('ай-яй-яй');
    }

    const updatedUser = this.prisma.user.update({
      where: {
        id: userDto.id,
      },
      data: {
        name: userDto.name,
      },
    });
    return updatedUser;
  }
}
