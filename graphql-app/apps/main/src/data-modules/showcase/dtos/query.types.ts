import { QueryArgsType } from '@nestjs-query/query-graphql';
import { ShowcaseDto } from './showcase.dto';
import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class ShowcaseQuery extends QueryArgsType(ShowcaseDto) {}

export const ShowcaseConnection = ShowcaseQuery.ConnectionType;
