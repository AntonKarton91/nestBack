import { Body, Controller, Post } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { ConfigService } from "@nestjs/config";

@Controller('auth')
export class AuthController {


  @Post('registration')
  async register(@Body() dto: AuthDto) {

  }

  @Post('login')
  async login(@Body() dto: AuthDto) {

  }

}
