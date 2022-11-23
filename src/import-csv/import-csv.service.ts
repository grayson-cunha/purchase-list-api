import { Injectable } from '@nestjs/common';
import { utils, read } from 'xlsx';

import { Product } from '../products/product.entity';

interface ProductRaw {
  id: number;
  short_name: string;
  name: string;
  unit_measurement: string;
  unit_price: string;
  total_price: string;
  supermarket: string;
  imported_at: Date;
  invoice_date: string;
}

@Injectable()
export class ImportCsvService {
  constructor() {}

  readFile(file: Express.Multer.File): Product[] {
    const workbook = read(file.buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const products = utils.sheet_to_json(worksheet);

    return products.map(({ unit_measurement, unit_price, total_price, ...productData }: ProductRaw) => {
      const [, newUnitPrice] = unit_price.replace(',', '.').split(' ');
      const [, newTotalPrice] = total_price.replace(',', '.').split(' ');

      return {
        unit_price: Number(newUnitPrice),
        total_price: Number(newTotalPrice),
        unit_measurement: unit_measurement.toUpperCase(),
        ...productData,
      };
    }) as Product[];
  }
}
