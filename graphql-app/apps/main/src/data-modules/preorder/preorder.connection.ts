import { ArgsType } from '@nestjs/graphql';
import { QueryArgsType } from '@nestjs-query/query-graphql';
import { PreorderDto } from './dtos/preorder.dto';

@ArgsType()
export class PreorderDtoQuery extends QueryArgsType(PreorderDto) {}
export const PreorderConnection = PreorderDtoQuery.ConnectionType;
