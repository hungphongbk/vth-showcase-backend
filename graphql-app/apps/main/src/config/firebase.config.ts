import admin, { AppOptions, ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../.private/firebase-credentials.json';

const firebaseConfig = () =>
  ({
    credential: admin.credential.cert(
      serviceAccount as unknown as ServiceAccount,
    ),
  } as AppOptions);

export default firebaseConfig;
