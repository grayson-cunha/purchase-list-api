import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { GetId } from '../shared/decorators/get-id.decorator';
import { PurchaseList } from './purchase-list.entity';
import { PurchaseListService } from './purchase-list.service';

@UseGuards(JwtAuthGuard)
@Controller('/purchase-lists')
export class PurchaseListController {
  constructor(private purchaseListService: PurchaseListService) {}

  @Get()
  findAll() {
    return this.purchaseListService.findAll();
  }

  @Post()
  create(@Body() body: PurchaseList) {
    return this.purchaseListService.create(body);
  }

  @Put('/:id')
  udate(@GetId() purchaseListId: number, @Body() body: Partial<PurchaseList>) {
    return this.purchaseListService.update(purchaseListId, body);
  }

  @Delete('/:id')
  delete(@GetId() purchaseListId: number) {
    return this.purchaseListService.delete(purchaseListId);
  }
}
