import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { PurchaseList } from '../src/purchase-list/purchase-list.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../src/guards/jwt.auth.guard';

describe('Purchase List Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const purchaseListRepository = moduleFixture.get<Repository<PurchaseList>>(getRepositoryToken(PurchaseList));
    await purchaseListRepository.clear();
  });

  it('should get all purchase list', () => {
    return request(app.getHttpServer())
      .get('/purchase-lists')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(0);
      });
  });

  it('should create a purchase list', () => {
    const totalPrice = 100.2;
    const summary = `Item 1 50.2; Item 2 50.2`;

    return request(app.getHttpServer())
      .post('/purchase-lists')
      .send({ total_price: 100.2, summary })
      .expect(201)
      .then((res) => {
        const { id, total_price, data, summary } = res.body;
        expect(id).toBeDefined();
        expect(total_price).toEqual(totalPrice);
        expect(data).toEqual(data);
        expect(summary).toEqual(summary);
      });
  });

  it('should update a purchase list', async () => {
    const totalPrice = 100.2;
    const newTotalPrice = 50.2;
    const summary = `Item 1 50.2; Item 2 50.2`;

    const { body } = await request(app.getHttpServer())
      .post('/purchase-lists')
      .send({ total_price: totalPrice, summary });

    return request(app.getHttpServer())
      .put(`/purchase-lists/${body.id}`)
      .send({ total_price: newTotalPrice })
      .expect(200)
      .then((res) => {
        const { total_price } = res.body;
        expect(total_price).toEqual(newTotalPrice);
      });
  });

  it('should delete a purchase list', async () => {
    const totalPrice = 100.2;
    const summary = `Item 1 50.2; Item 2 50.2`;

    const { body } = await request(app.getHttpServer())
      .post('/purchase-lists')
      .send({ total_price: totalPrice, summary });

    return request(app.getHttpServer())
      .delete(`/purchase-lists/${body.id}`)
      .expect(200)
      .then((res) => {
        const { id } = res.body;
        expect(id).toEqual(body.id);
      });
  });
});
