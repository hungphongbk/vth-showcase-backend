import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryFirestoreModule } from '@app/query-firestore';
import { MailTemplateDto } from '@app/mailer/dtos/mail-template.dto';

export const MailerTemplateGraphqlModule = NestjsQueryGraphQLModule.forFeature({
  imports: [NestjsQueryFirestoreModule.forFeature(MailTemplateDto)],
  resolvers: [{ DTOClass: MailTemplateDto, EntityClass: MailTemplateDto }],
});
