import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
// noinspection ES6PreferShortImport
import { InvestmentPackageEntity } from '../investment/investment.package.entity';
import { ShowcaseEntity } from '../showcase/entities/showcase.entity';

@Entity()
export class ShowcaseInvestPkgEntity {
  @ManyToOne(() => InvestmentPackageEntity, (pkg) => pkg.showcasePkg)
  pkg: InvestmentPackageEntity;
  @PrimaryColumn()
  pkgId: number;

  @ManyToOne(() => ShowcaseEntity, (showcase) => showcase.showcasePkgs)
  showcase: ShowcaseEntity;
  @PrimaryColumn()
  showcaseId: number;

  @Column({ nullable: true })
  fundedRate: number;

  @Column({ nullable: true })
  count: number;

  @Column({ nullable: true })
  benefitRate: number;
}
