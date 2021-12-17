import { AssemblerQueryService, QueryService } from '@nestjs-query/core';
import { AuthAssembler, FirebaseUserClass } from './auth.assembler';
import { AuthDto } from './dtos/auth.dto';
import { FirebaseAuthQueryService } from './firebase-auth-query.service';
import { forwardRef, Inject } from '@nestjs/common';

@QueryService(AuthDto)
export class AuthQueryService extends AssemblerQueryService<
  AuthDto,
  FirebaseUserClass
> {
  constructor(
    @Inject(forwardRef(() => AuthAssembler))
    assembler: AuthAssembler,
    readonly queryService: FirebaseAuthQueryService,
  ) {
    super(assembler, queryService);
  }
}
