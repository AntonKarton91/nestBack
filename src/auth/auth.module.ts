import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigService } from "@nestjs/config";
import { AuthService } from './auth.service';
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {register} from "tsconfig-paths";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      forwardRef(() => UserModule),
      JwtModule.register({
        secret: process.env.PRIVATE_KEY || "SECRET",
        signOptions: {
            expiresIn: "24h"
        }
      })
  ],
    exports: [ AuthService, JwtModule ]
})
export class AuthModule {}
