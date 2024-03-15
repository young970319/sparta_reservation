import Joi from 'joi';

import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth/auth.middleware';

import { User } from './user/entities/user.entity';
import { Reservation } from './reservation/entities/reservation.entity';
import {ReservationModule} from './reservation/reservation.module'
import { UserModule } from './user/user.module';
import { ShowModule } from './show/show.module';
import { configModuleValidation } from './configs/env-validation.config';
import { typeOrmModuleOptions } from './configs/database.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configModuleValidation,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'), // .env 파일에 JWT_SECRET_KEY라는 키로 비밀키를 저장해두고 사용합니다.
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({
      ttl: 60000, // 데이터 캐싱 시간(밀리 초 단위, 1000 = 1초)
      max: 100, // 최대 캐싱 개수
      isGlobal: true,
    }),
    UserModule,
    ShowModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // 미들웨어 적용!
      .forRoutes({ path: 'user/check', method: RequestMethod.GET }); // user/check 엔드포인트에만 적용
  }
}