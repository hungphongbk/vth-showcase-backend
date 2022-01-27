import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { InvestorRegistrationDto } from '@app/investor/dtos/investor-registration.dto';
import { InvestorRegistrationFirestoreModule } from '@app/investor/modules/firestore';
import { InvestorRegistrationCreateDto } from '@app/investor/dtos/investor-registration.create.dto';
import { GqlAdminAuthGuard } from '@app/auth';
import { AuthFirebaseModule } from '@app/auth/modules/auth-firebase.module';

export const InvestorRegistrationGraphqlModule =
  NestjsQueryGraphQLModule.forFeature({
    imports: [InvestorRegistrationFirestoreModule, AuthFirebaseModule],
    resolvers: [
      {
        DTOClass: InvestorRegistrationDto,
        EntityClass: InvestorRegistrationDto,
        CreateDTOClass: InvestorRegistrationCreateDto,
        read: { guards: [GqlAdminAuthGuard] },
        create: { many: { disabled: true } },
        update: { guards: [GqlAdminAuthGuard], many: { disabled: true } },
        delete: { guards: [GqlAdminAuthGuard], many: { disabled: true } },
      },
    ],
  });
