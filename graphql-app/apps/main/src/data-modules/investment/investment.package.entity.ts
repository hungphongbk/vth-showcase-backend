import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// noinspection ES6PreferShortImport
import { ShowcaseInvestPkgEntity } from '../showcase-invest-pkg/showcase-invest-pkg.entity';

@Entity('investmentPackage')
export class InvestmentPackageEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @OneToMany(() => ShowcaseInvestPkgEntity, (rel) => rel.pkg, {
    cascade: true,
    eager: true,
  })
  showcasePkg?: ShowcaseInvestPkgEntity;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  displayName: string;

  @Column({ nullable: false })
  fundedRate: number;

  @Column({ nullable: false })
  count: number;

  @Column({ nullable: false })
  benefitRate: number;
}
