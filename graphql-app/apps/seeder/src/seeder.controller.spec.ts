import { Test, TestingModule } from '@nestjs/testing';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

describe('SeederController', () => {
  let seederController: SeederController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SeederController],
      providers: [SeederService],
    }).compile();

    seederController = app.get<SeederController>(SeederController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(seederController.getHello()).toBe('Hello World!');
    });
  });
});
