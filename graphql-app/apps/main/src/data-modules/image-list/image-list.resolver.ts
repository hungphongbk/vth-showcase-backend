import { Args, ArgsType, ID, Resolver } from '@nestjs/graphql';
import { ImageListDto } from './dto/image-list.dto';
import {
  MutationArgsType,
  MutationHookArgs,
} from '@nestjs-query/query-graphql';
import { MediaCreateDto } from '../media/dtos/media.create.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { ImageListMediaEntity } from './entities/image-list.media.entity';
import { ImageListEntity } from './entities/image-list.entity';

@ArgsType()
class InsertOneMediaToImageListInput extends MutationArgsType(MediaCreateDto) {}

@Resolver(() => ImageListDto)
export class ImageListResolver {
  constructor(
    @InjectQueryService(ImageListEntity)
    private readonly service: QueryService<ImageListDto>,
    @InjectQueryService(ImageListMediaEntity)
    private readonly mediaQueryService: QueryService<ImageListMediaEntity>,
  ) {}

  @Resolver(() => ImageListDto)
  async insertOneMediaToImageList(
    @Args({ name: 'id', type: () => ID }) id: string,
    @MutationHookArgs() input: InsertOneMediaToImageListInput,
  ) {
    const { id: imageId } = await this.mediaQueryService.createOne(input.input);
    await this.service.addRelations('images', id, [imageId]);
    return await this.service.getById(id);
  }

  @Resolver(() => ImageListDto)
  async deleteOneMediaFromImageList(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args({ name: 'mediaId', type: () => ID }) mediaId: string,
  ) {
    await this.service.removeRelations('images', id, [mediaId]);
    await this.mediaQueryService.deleteOne(mediaId);
    return await this.service.getById(id);
  }
}
