import {
  Body,
  Controller, HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  @UsePipes(new ValidationPipe())
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.register(response, dto);
  }

  @Post('/login')
  async login(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(response, dto);
  }

  @Post('/logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const { refreshToken } = request.cookies;
    response.clearCookie("refreshToken")
    await this.authService.logout(refreshToken);
    return {
      statusCode: 200
    };
  }

  @Post('/refresh')
  async refresh(
      @Res({ passthrough: true }) response: Response,
      @Req() request: Request,
  ) {
    return await this.authService.refresh(request, response);
  }
}
