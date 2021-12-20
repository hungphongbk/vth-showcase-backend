import {
  PublishStatus,
  ShowcaseStatus,
} from '../../data-modules/showcase/dtos/showcase.dtos';
import { addDays } from 'date-fns';
import { ShowcaseEntity } from '../../data-modules/showcase/entities/showcase.entity';

const current = new Date();
export const ShowcaseSeedData: Partial<ShowcaseEntity> = {
  authorUid: '386pnR8ow4hJr7nl7bj92Txf2fn1',
  name: 'Showcase mặc định',
  slug: 'showcase-mac-dinh',
  brand: {
    name: 'Vaithuhay.com',
    description: 'vaithuhay',
  },
  status: ShowcaseStatus.COMING,
  publishStatus: PublishStatus.PUBLISHED,
  description: 'description',
  createdAt: current,
  updatedAt: current,
  expectedSaleAt: current,
  expectedSaleEndAt: addDays(current, 70),
  expectedQuantity: {
    regular: 100,
    pioneer: 15,
    promo: 25,
    preorder: 40,
  },
  expectedSalePrice: {
    regular: 1000000,
    pioneer: 700000,
    promo: 800000,
    preorder: 900000,
  },
  inventory: {
    capitalizationRate: 50,
    adCostRate: 17,
    operatingCostRate: 8,
    revolvingInterval: 30,
    expectedGrowthRate: 2,
  },
};
