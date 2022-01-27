import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseStrategy } from '@app/auth/strategies/firebase.strategy';
import { AuthAssembler } from '@app/auth/assemblers/auth.assembler';
import { DecodedIdTokenAssembler } from '@app/auth/assemblers/decoded-id-token.assembler';
import { FirebaseAdminStrategy } from '@app/auth/strategies/firebase-admin.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: ['firebase', 'firebase-admin'],
    }),
  ],
  providers: [
    FirebaseStrategy,
    FirebaseAdminStrategy,
    AuthAssembler,
    DecodedIdTokenAssembler,
  ],
  exports: [
    FirebaseStrategy,
    FirebaseAdminStrategy,
    AuthAssembler,
    DecodedIdTokenAssembler,
  ],
})
export class AuthFirebaseModule {}
