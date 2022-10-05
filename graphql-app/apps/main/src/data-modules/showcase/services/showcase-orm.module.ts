import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowcaseEntity } from '../entities/showcase.entity';
import { ShowcaseMediaEntity } from '../entities/showcase.media.entity';
import { ShowcaseViewEntity } from '../entities/showcase-view.entity';

export const ShowcaseOrmModule = TypeOrmModule.forFeature([
  ShowcaseEntity,
  ShowcaseMediaEntity,
  ShowcaseViewEntity,
]);
