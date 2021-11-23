import admin, { AppOptions, ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../../.private/firebase-credentials.json';
import { registerAs } from '@nestjs/config';

const firebaseConfig = registerAs(
  'firebase',
  () =>
    ({
      credential: admin.credential.cert(
        serviceAccount as unknown as ServiceAccount,
      ),
    } as AppOptions),
);

export default firebaseConfig;
