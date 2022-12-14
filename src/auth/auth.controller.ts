import {
  Controller,
  UseGuards,
  Get,
  Req,
  Ip,
  Body,
  Delete,
  Post,
  Res,
} from '@nestjs/common';
import { User } from '../user/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async findOne(@Req() req: any): Promise<User | null | undefined> {
    const userId = req.user.userId;
    return await this.userService.findOne(userId);
  }

  @Post('login')
  async login(
    @Req() request: any,
    @Res() response: any,
    @Ip() ip: string,
    @Body() body: LoginDto,
  ) {
    return this.authService.login(response, body.email, body.password, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    });
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Delete('logout')
  async logout(@Res() response: any, @Body() body: RefreshTokenDto) {
    return this.authService.logout(response, body.refreshToken);
  }
}
