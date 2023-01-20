import { Body, Controller, Post } from "@nestjs/common";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/createUser.dto";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/registration')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto)
  }

  @Post('/login')
  async login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto)
  }

}
