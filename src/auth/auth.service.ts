import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  async register(userDto: UserDto) {
    const user = await this.prisma.user.create({
      data: {
        name: userDto.name,
      },
    });
    return user;
  }
}
