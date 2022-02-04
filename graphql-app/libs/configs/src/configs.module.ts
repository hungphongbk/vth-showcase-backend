import { Module } from '@nestjs/common';
import { RabbitmqConfigModule } from '@app/configs/rabbitmq-config.module';
import { VthConfigsService } from '@app/configs/configs.service';

@Module({
  imports: [RabbitmqConfigModule],
  providers: [VthConfigsService],
  exports: [VthConfigsService],
})
export class VthConfigsModule {}
