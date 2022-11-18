import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@UseGuards(JwtAuthGuard)
@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() body: Product) {
    return this.productsService.create(body);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}
