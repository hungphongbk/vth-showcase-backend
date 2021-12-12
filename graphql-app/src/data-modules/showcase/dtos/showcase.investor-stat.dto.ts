import { Field, ObjectType } from '@nestjs/graphql';
import { ShowcaseDto } from './showcase.dtos';
import * as _ from 'lodash';
import { differenceInDays, parseISO } from 'date-fns';
import { AuthRoleType } from '../../../auth/auth.entity';
import { AuthDto } from '../../../auth/dtos/auth.dto';

@ObjectType()
export class ShowcaseInvestorStatDto {
  constructor(private readonly showcase: ShowcaseDto) {}

  @Field()
  get firstYearRevenue(): number {
    return (
      12.0 *
      (this.totalRevenue * (30 / this.campaignDuration)) *
      (1 + (this.showcase.inventory.expectedGrowthRate * 12.0) / 100)
    );
  }

  @Field()
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
    return this.showcase.inventory.expectedGrowthRate;
  }

  canReadThisStat(user: AuthDto): boolean {
    return (
      user.role === AuthRoleType.INVESTOR ||
      (user.role === AuthRoleType.USER && user.uid === this.showcase.authorUid)
    );
  }
}
