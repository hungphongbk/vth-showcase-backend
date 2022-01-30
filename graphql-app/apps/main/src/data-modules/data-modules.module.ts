import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module';
import { HighlightFeatureModule } from './highlight-feature/highlight-feature.module';
import { ImageListModule } from './image-list/image-list.module';
import { SettingsModule } from './setting/settings.module';
import { InvestmentModule } from './investment';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from '../ormconfig';
import { ShowcaseModule } from './showcase/showcase.module';
import { CommentModule } from './comment/comment.module';
import { PrjUpdateModule } from './prj-update/prj-update.module';
import { PreorderModule } from './preorder/preorder.module';

function globImport(r: any) {
  return r
    .keys()
    .map(r)
    .reduce((acc, val) => [...acc, ...Object.values(val)], []);
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () =>
        Object.assign(connectionOptions, {
          autoLoadEntities: true,
          migrations: globImport(
            require.context('../migrations', false, /\.ts/),
          ),
        }),
    }),
    ShowcaseModule,
    MediaModule,
    HighlightFeatureModule,
    ImageListModule,
    SettingsModule,
    InvestmentModule,
    CommentModule,
    PrjUpdateModule,
    PreorderModule,
  ],
})
export class DataModulesModule {}
