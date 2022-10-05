import {
  PublishStatus,
  ShowcaseStatus,
} from '../../data-modules/showcase/dtos/showcase.dto';
import { addDays } from 'date-fns';
import { ShowcaseEntity } from '../../data-modules/showcase/entities/showcase.entity';
import { ShowcaseHFEntity } from '../../data-modules/highlight-feature/entities/showcaseHF.entity';

const current = new Date(),
  createdAt = new Date(2022, 1, 7);
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
  description:
    'GravaStar là thương hiệu thiết kế và sản xuất thiết bị loa và phụ kiện đi kèm trên thị trường. Các thiết kế của thương hiệu mang ý tưởng điên rồ, độc đáo vượt qua mọi giới hạn sẵn có',
  createdAt: createdAt,
  updatedAt: createdAt,
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

export const ShowcaseHFData: Partial<ShowcaseHFEntity>[] = [
  {
    name: 'Thiết kế tựa lưng cong theo cột sống',
    description:
      'Ghế công thái học Ergonomic Chairs tập trung thiết kế kế tựa lưng phù hợp với 4 vị trí của cột sống chuẩn khoa học là cổ, ngực, thắt lưng và mông. Thông qua vị trí đó, tựa lưng được mô tả lại giống như độ cong của cột sống chuẩn công thái học, kết hợp với khung ghế linh hoạt giúp lưng bạn luôn trong tư thế thẳng và tự nhiên nhất có thể.',
  },
  {
    name: 'Chất liệu cao cấp',
    description:
      'Chất liệu lưới của thân ghế và đệm ngồi đảm bảo độ bền cao, lưới có độ căng lớn và không bị biến dạng khi sử dụng, khoảng cách giữa các lỗ khí được phân bổ hợp lý giúp Lưng thoáng mát không bị hầm hay tạo cảm giác ngột ngạt.',
  },
  {
    name: 'Khung ghế ngồi mang lại sự thoải mái',
    description:
      'Ghế Ergonomic đã chuyển đổi khung ngồi có độ nghiêng lớn thành hình dạng giá đỡ hình vòm, thiết kế này giúp vừa vặn nâng chân lên 8 độ giúp lưng, hông và chân thoải mái, góp phần giảm áp lực lên eo và đùi.',
  },
];
