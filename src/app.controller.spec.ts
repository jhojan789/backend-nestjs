import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('/users', () => {
    it('should return a list of users', () => {
      expect(appController.getUsers()).toEqual([
        { name: 'user1' },
        { name: 'user2' },
      ]);
    });
  });

  describe('/products', () => {
    let app: INestApplication;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    it('GET /products/:id should return a product by ID', () => {
      const id = '1';
      return request(app.getHttpServer())
        .get(`/products/${id}`)
        .expect(200)
        .expect(`Product id: ${id}`);
    });
    it('should return a products with limit offset', () => {
      const limit = '1';
      const offset = '0';
      // const products = appController.getProducts(limit,offset);
      // expect(products).toBe(`Products limit: ${limit}, offset: ${offset}`);
      return request(app.getHttpServer())
        .get(`/products?limit=${limit}&offset=${offset}`)
        .expect(200)
        .expect(`Products limit: ${limit}, offset: ${offset}`);
    });
  });
});
