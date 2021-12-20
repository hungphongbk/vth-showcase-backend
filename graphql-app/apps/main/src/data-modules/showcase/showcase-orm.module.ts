import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowcaseEntity } from './entities/showcase.entity';
import { ShowcaseMediaEntity } from './entities/showcase.media.entity';

export const ShowcaseOrmModule = TypeOrmModule.forFeature([
  ShowcaseEntity,
  ShowcaseMediaEntity,
]);
