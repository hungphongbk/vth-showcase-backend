import { IShowcaseInventory } from '../interfaces/IShowcaseInventory';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Thông tin về chi phí vận hành showcase' })
@InputType('ShowcaseInventoryDtoInput')
export class ShowcaseInventoryDto implements IShowcaseInventory {
  @Field({ description: 'Tỉ lệ chi phí quảng cáo' })
  adCostRate: number;

  @Field({ description: 'Tỉ lệ giá vốn/giá bán sản phẩm' })
  capitalizationRate: number;

  @Field({ description: 'Tỉ lệ chi phí vận hành' })
  operatingCostRate: number;

  @Field({ description: 'Vòng quay vốn an toàn tương ứng' })
  revolvingInterval: number;

  @Field({ description: 'Tốc độ tăng trưởng kì vọng' })
  expectedGrowthRate: number;
}
