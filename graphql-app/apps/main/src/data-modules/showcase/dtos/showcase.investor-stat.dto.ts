/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { ShowcaseDto } from './showcase.dtos';
import * as _ from 'lodash';
import { differenceInDays, parseISO } from 'date-fns';
import { AuthDto, AuthRoleType } from '../../../auth';

@ObjectType()
export class ShowcaseInvestorStatDto {
  constructor(private readonly showcase: ShowcaseDto) {}

  @Field({ description: 'Doanh thu dự kiến năm đầu' })
  get firstYearRevenue(): number {
    return (
      12.0 *
      (this.totalRevenue * (30 / this.campaignDuration)) *
      (1 + (this.inventory.expectedGrowthRate * 12.0) / 100)
    );
  }

  @Field({ description: 'Doanh thu tổng' })
  get totalRevenue(): number {
    return _.chain(['pioneer', 'promo', 'preorder'])
      .map(
        (label) =>
          this.showcase.expectedQuantity![label] *
          this.showcase.expectedSalePrice![label],
      )
      .sum()
      .value();
  }

  @Field()
  get campaignDuration(): number {
    return differenceInDays(
      parseISO(this.showcase.expectedSaleEndAt as unknown as string),
      parseISO(this.showcase.expectedSaleAt as unknown as string),
    );
  }

  @Field()
  get growthRate(): number {
    return this.inventory.expectedGrowthRate;
  }

  @Field()
  get adCostRate(): number {
    return this.inventory.adCostRate;
  }

  @Directive('@currency')
  @Field(() => String, { description: 'Tổng chi phí quảng cáo trung bình' })
  get adCost(): number {
    return (this.adCostRate / 100.0) * this.firstYearRevenue;
  }

  @Field()
  get operatingCostRate(): number {
    return this.inventory.operatingCostRate;
  }

  @Directive('@currency')
  @Field(() => String)
  get operatingCost(): number {
    return (this.operatingCostRate / 100.0) * this.firstYearRevenue;
  }

  @Field()
  get capitalizationRate(): number {
    return this.inventory.capitalizationRate;
  }

  @Directive('@currency')
  @Field(() => String)
  get capitalizationCost(): number {
    return (this.capitalizationRate / 100.0) * this.firstYearRevenue;
  }

  @Directive('@currency')
  @Field(() => String)
  get expectedProfit(): number {
    return (
      this.firstYearRevenue -
      (this.capitalizationCost + this.adCost + this.operatingCost)
    );
  }

  @Field(() => Number)
  get revolvingInterval(): number {
    return this.inventory.revolvingInterval;
  }

  @Field(() => Number)
  get revolvingPerDay(): number {
    return 365.0 / this.revolvingInterval;
  }

  @Directive('@currency')
  @Field(() => String)
  get initialCapital() {
    const inv = this.inventory;
    const sumOfCapRate =
      (inv.capitalizationRate + inv.adCostRate + inv.operatingCostRate) * 0.01;
    return (this.firstYearRevenue / this.revolvingPerDay) * sumOfCapRate;
  }

  get inventory() {
    return this.showcase.inventory;
  }
  canReadThisStat(user: AuthDto): boolean {
    return (
      [AuthRoleType.INVESTOR, AuthRoleType.ADMIN, AuthRoleType.SUPERADMIN].some(
        (v) => v === user.role,
      ) ||
      (user.role === AuthRoleType.USER && user.uid === this.showcase.authorUid)
    );
  }
}
