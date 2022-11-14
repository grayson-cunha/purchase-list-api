import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { Product } from './products/product.entity';
import { ProductsModule } from './products/products.module';
import { PurchaseList } from './purchase-list/purchase-list.entity';
import { PurchaseListModule } from './purchase-list/purchase-list.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Product, PurchaseList, User],
        synchronize: true,
      }),
    }),
    ProductsModule,
    PurchaseListModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
