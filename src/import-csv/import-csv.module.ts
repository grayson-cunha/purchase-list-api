import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { ImportCsvController } from './import-csv-controller';
import { ImportCsvService } from './import-csv.service';

@Module({
  imports: [ProductsModule],
  controllers: [ImportCsvController],
  providers: [ImportCsvService],
  exports: [ImportCsvService],
})
export class ImportCsvModule {}
