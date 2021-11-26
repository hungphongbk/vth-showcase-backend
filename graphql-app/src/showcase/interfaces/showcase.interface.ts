import { IShowcasePrice } from './IShowcasePrice';
import { ShowcaseStatus } from '../dtos/showcase.dtos';
import { IShowcaseBrand } from './IShowcaseBrand';
import { MediaInterface } from '../../gql/interfaces/media.interface';

export abstract class ShowcaseInterface extends MediaInterface {
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
