import { PublishStatus, ShowcaseStatus } from '../dtos/showcase.dto';
import { ShowcasePriceInterface } from './showcase-price.interface';
import { ShowcaseInventoryInterface } from './showcase-inventory.interface';

export interface ShowcaseInterface {
  authorUid: string;
  id: number;
  name: string;
  slug: string;
  status: ShowcaseStatus;
  publishStatus: PublishStatus;
  isFeatured: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  expectedSaleAt: Date | null;
  expectedSaleEndAt: Date | null;
  expectedQuantity: ShowcasePriceInterface;
  expectedSalePrice: ShowcasePriceInterface;
  inventory: ShowcaseInventoryInterface;
}
