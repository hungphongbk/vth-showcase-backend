import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { ShowcaseDto } from './dtos/showcase.dtos';
import { ShowcaseEntity } from './entities/showcase.entity';

@Assembler(ShowcaseDto, ShowcaseEntity)
export class ShowcaseAssembler extends ClassTransformerAssembler<
  ShowcaseDto,
  ShowcaseEntity
> {}
