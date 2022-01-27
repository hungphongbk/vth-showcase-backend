import { Test, TestingModule } from '@nestjs/testing';
import { InvestorService } from './investor.service';

describe('InvestorService', () => {
  let service: InvestorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestorService],
    }).compile();

    service = module.get<InvestorService>(InvestorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
