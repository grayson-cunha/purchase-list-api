import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ImportCsvModule } from './import-csv/import-csv.module';
import { ProductsModule } from './products/products.module';
import { PurchaseListModule } from './purchase-list/purchase-list.module';

@Module({
  imports: [ProductsModule, PurchaseListModule, AuthModule, ConfigurationModule, ImportCsvModule],
  controllers: [AppController],
})
export class AppModule {}
