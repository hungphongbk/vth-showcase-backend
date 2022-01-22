import { Test, TestingModule } from '@nestjs/testing';
import { QueryFirestoreService } from './query-firestore.service';

describe('QueryFirestoreService', () => {
  let service: QueryFirestoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryFirestoreService],
    }).compile();

    service = module.get<QueryFirestoreService>(QueryFirestoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
