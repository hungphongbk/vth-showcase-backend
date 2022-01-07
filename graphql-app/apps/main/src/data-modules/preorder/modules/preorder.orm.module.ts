import { TypeOrmModule } from '@nestjs/typeorm';
import { PreorderEntity } from '../entities/preorder.entity';

export const PreorderOrmModule = TypeOrmModule.forFeature([PreorderEntity]);
