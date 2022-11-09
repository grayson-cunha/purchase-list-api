import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseListController } from './purchase-list.controller';
import { PurchaseList } from './purchase-list.entity';
import { PurchaseListService } from './purchase-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseList])],
  controllers: [PurchaseListController],
  providers: [PurchaseListService],
})
export class PurchaseListModule {}
