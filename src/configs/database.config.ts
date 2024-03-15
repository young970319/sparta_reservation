import { ConfigModule,ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const typeOrmModuleOptions : TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        namingStrategy: new SnakeNamingStrategy(),   //엔티티 네임을 스네이크 케이스로 따로 지정해주지 않아도 알아서 저장
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities : true,
        synchronize: configService.get('DB_SYNC'),
        logging: true,
    }),
};

/*
스네이크케이스 로 한번에 바꾸기 위해 사용

npm install typeorm-naming-strategies --save

*/