import { Module } from '@nestjs/common';
import { ShowcaseMicroserviceModule } from './showcase/showcase-microservice.module';

@Module({
  imports: [ShowcaseMicroserviceModule],
})
export class MicroservicesModule {}
