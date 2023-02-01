import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { ProductsService } from '../products/products.service';
import { ImportCsvService } from './import-csv.service';

@UseGuards(JwtAuthGuard)
@Controller('import')
export class ImportCsvController {
  constructor(
    private importCsvService: ImportCsvService,
    private productsService: ProductsService
  ) {}

  @Post('/products')
  @UseInterceptors(FileInterceptor('file-csv-products'))
  async importProductsFromCsv(@UploadedFile() file: Express.Multer.File) {
    const products = this.importCsvService.readFile(file);

    return this.productsService.saveMany(products);
  }
}
