import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseList } from './purchase-list.entity';

@Injectable()
export class PurchaseListService {
  constructor(@InjectRepository(PurchaseList) private purchaseListRepository: Repository<PurchaseList>) {}

  create(purchaseList: PurchaseList) {
    return this.purchaseListRepository.save(purchaseList);
  }

  findAll() {
    return this.purchaseListRepository.find();
  }

  async update(id: number, purchaseList: Partial<PurchaseList>) {
    await this.purchaseListRepository.update(id, purchaseList);
    return this.purchaseListRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    const purchaseList = await this.purchaseListRepository.findOne({ where: { id } });
    await this.purchaseListRepository.delete(id);
    return purchaseList;
  }
}
