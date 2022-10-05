import { ShowcaseDto } from '../dtos/showcase.dto';
import { Resolver } from '@nestjs/graphql';

@Resolver(() => ShowcaseDto)
export class ShowcaseQueryResolver {}
