import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';

export const BrandOrmModule = TypeOrmModule.forFeature([BrandEntity]);
