import { InvestmentPackageEntity } from '../../data-modules/investment';

export const InvestmentPackagesSeedData: InvestmentPackageEntity[] = [
  {
    id: 1,
    slug: 'private-package',
    displayName: 'Gói đầu tư PRIVATE',
    fundedRate: 50,
    count: 1,
    benefitRate: 100,
  },
  {
    id: 2,
    slug: 'standard-package',
    displayName: 'Gói đầu tư STANDARD',
    fundedRate: 10,
    count: 5,
    benefitRate: 50,
  },
  {
    id: 3,
    slug: 'crows-package',
    displayName: 'Gói đầu tư CROWFUNDING',
    fundedRate: 5,
    count: 10,
    benefitRate: 50,
  },
];
