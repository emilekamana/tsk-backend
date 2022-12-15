import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
// import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { Response } from 'express';
import { ClientJwtAuthGuard } from 'src/auth/guards/clientJwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(res, createUserDto);
  }

  @UseGuards(JwtStrategy)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtStrategy)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null | undefined> {
    return await this.userService.findOne(id);
  }

  @UseGuards(ClientJwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(ClientJwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
