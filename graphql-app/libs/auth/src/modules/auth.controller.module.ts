import { Module } from '@nestjs/common';
import { AuthQueryService } from '../services/auth.query.service';
import { AuthAssembler } from '../assemblers/auth.assembler';
import { FirebaseAuthQueryService } from '../firebase-auth-query.service';
import { AuthController } from '../auth.controller';

@Module({
  providers: [AuthQueryService, AuthAssembler, FirebaseAuthQueryService],
  controllers: [AuthController],
})
export class AuthControllerModule {}
