import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
