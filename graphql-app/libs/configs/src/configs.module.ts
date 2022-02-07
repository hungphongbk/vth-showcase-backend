import { Module } from '@nestjs/common';
import { RabbitmqConfigModule } from '@app/configs/rabbitmq-config.module';
import { VthConfigsService } from '@app/configs/configs.service';
import { FirebaseConfigModule } from '@app/configs/firebase-config.module';

@Module({
  imports: [RabbitmqConfigModule, FirebaseConfigModule],
  providers: [VthConfigsService],
  exports: [VthConfigsService],
})
export class VthConfigsModule {}
