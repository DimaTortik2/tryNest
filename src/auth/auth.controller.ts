import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { UserDto } from 'src/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('get')
  findOne(@Query('id') id: string) {
    return this.authService.findOne(Number(id));
  }

  @Get('getAll')
  findAll() {
    return this.authService.findAll();
  }

  @Post('register')
  register(@Body() userDto: Pick<UserDto, 'name'>) {
    return this.authService.register(userDto.name);
  }

  @Delete('delete')
  delete(@Body() UserDto: Pick<UserDto, 'id'>) {
    return this.authService.delete(UserDto.id);
  }

  @Put('update')
  update(@Body() UserDto: UserDto) {
    return this.authService.update(UserDto);
  }
}
