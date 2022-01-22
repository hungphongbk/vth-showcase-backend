import { DynamicModule, Module } from '@nestjs/common';
import { QueryFirestoreService } from './query-firestore.service';
import { FirebaseModule } from '@app/firebase';
import { Class } from '@nestjs-query/core';
import { createQueryFirestoreServiceProvider } from './query-firestore.providers';

@Module({
  providers: [QueryFirestoreService],
  exports: [QueryFirestoreService],
})
export class NestjsQueryFirestoreModule {
  static forFeature(DTO: Class<unknown>): DynamicModule {
    const queryServiceProvider = createQueryFirestoreServiceProvider(
      DTO as any,
    );
    return {
      imports: [FirebaseModule],
      module: NestjsQueryFirestoreModule,
      providers: [queryServiceProvider],
      exports: [queryServiceProvider],
    };
  }
}
