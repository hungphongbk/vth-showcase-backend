import { IShowcasePrice } from './IShowcasePrice';
import { ShowcaseStatus } from '../dtos/showcase.dtos';
import { IShowcaseBrand } from './IShowcaseBrand';

export interface IShowcase {
  id: string;
  name: string;
  slug: string;
  author: string;
  brand: IShowcaseBrand;
  status: ShowcaseStatus;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  expectedQuantity: number;
  expectedSaleAt: Date | null;
  expectedSalePrice: IShowcasePrice;
}
