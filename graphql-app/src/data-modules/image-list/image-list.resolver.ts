import { Resolver } from '@nestjs/graphql';
import { ImageListDto } from './dto/image-list.dto';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { CreateImageListInputDto } from './dto/create-image-list-input.dto';
import { ImageListEntity } from './entities/image-list.entity';
import { InjectQueryService, QueryService } from '@nestjs-query/core';

@Resolver(() => ImageListDto)
export class ImageListResolver extends CRUDResolver(ImageListDto, {
  CreateDTOClass: CreateImageListInputDto,
}) {
  constructor(
    @InjectQueryService(ImageListEntity)
    readonly service: QueryService<ImageListDto, CreateImageListInputDto>,
  ) {
    super(service);
  }
}
