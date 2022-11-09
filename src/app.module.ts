import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Product } from './products/product.entity';
import { ProductsModule } from './products/products.module';
import { PurchaseList } from './purchase-list/purchase-list.entity';
import { PurchaseListModule } from './purchase-list/purchase-list.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Product, PurchaseList],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    PurchaseListModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
