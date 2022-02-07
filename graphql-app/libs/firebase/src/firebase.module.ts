import { FirebaseAdminModule } from '@hungphongbk/nestjs-firebase-admin';
import { VthConfigsModule, VthConfigsService } from '@app/configs';

export const FirebaseModule = FirebaseAdminModule.forRootAsync({
  imports: [VthConfigsModule],
  inject: [VthConfigsService],
  useFactory: (configService: VthConfigsService) => {
    return {
      credential: configService.firebase.credential,
    };
  },
});
