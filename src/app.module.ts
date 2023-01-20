import { Module } from '@nestjs/common';
import * as path from "path"
import {ServeStaticModule} from "@nestjs/serve-static";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { BasketModule } from './basket/basket.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import {FileModule} from "./file/file.module";
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    MongooseModule.forRoot('mongodb://localhost:27017'),
    AuthModule,
    ProductModule,
    BasketModule,
    UserModule,
    FileModule,
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static'),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
