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
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/auth';
import { ShowcaseQueryService } from '../showcase/services/showcase-query.service';
import { ImageListCreateDto } from './dto/image-list.create.dto';

@ArgsType()
class InsertOneMediaToImageListInput extends MutationArgsType(MediaCreateDto) {}

@Resolver(() => ImageListDto)
export class ImageListResolver {
  constructor(
    @InjectQueryService(ImageListEntity)
    private readonly service: QueryService<ImageListDto, ImageListCreateDto>,
    @InjectQueryService(ImageListMediaEntity)
    private readonly mediaQueryService: QueryService<ImageListMediaEntity>,
    private readonly showcaseService: ShowcaseQueryService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @ResolverMutation(() => ImageListDto)
  async createOneImageList(@Args('slug') slug: string) {
    const imageList = await this.service.createOne({ images: [] });
    const showcase = await this.showcaseService.getOneShowcase(slug);
    await this.showcaseService.addRelations('imageLists', showcase.id, [
      imageList.id,
    ]);
    return imageList;
  }

  @UseGuards(GqlAuthGuard)
  @ResolverMutation(() => ImageListDto)
  async insertOneMediaToImageList(
    @Args({ name: 'id', type: () => ID }) id: string,
    @MutationHookArgs() input: InsertOneMediaToImageListInput,
  ) {
    const { id: imageId } = await this.mediaQueryService.createOne(input.input);
    await this.service.addRelations('images', id, [imageId]);
    return await this.service.getById(id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolverMutation(() => ImageListDto)
  async deleteOneMediaFromImageList(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args({ name: 'mediaId', type: () => ID }) mediaId: string,
  ) {
    await this.service.removeRelations('images', id, [mediaId]);
    await this.mediaQueryService.deleteOne(mediaId);
    return await this.service.getById(id);
  }
}
