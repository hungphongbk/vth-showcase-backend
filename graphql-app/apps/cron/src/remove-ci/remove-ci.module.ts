import { Module } from '@nestjs/common';
import { DataModulesTypeormModule } from 'apps/main/src/data-modules/data-modules-typeorm.module';
import { ShowcaseOrmModule } from 'apps/main/src/data-modules/showcase/orm-services/showcase-orm.module';
import { RemoveCiCommand } from './remove-ci.command';

@Module({
  imports: [DataModulesTypeormModule, ShowcaseOrmModule],
  providers: [RemoveCiCommand],
})
export class RemoveCiModule {}
