import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';

@Module({
  imports: [UserModule, AuthModule, MongooseModule.forRoot(config.MongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
