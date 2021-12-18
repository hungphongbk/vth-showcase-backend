import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('investmentPackage')
export class InvestmentPackageEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

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
