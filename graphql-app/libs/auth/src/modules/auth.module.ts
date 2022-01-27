import { Class } from '@nestjs-query/core';
import {
  DynamicModule,
  ForwardReference,
  Global,
  Inject,
  Module,
} from '@nestjs/common';
import { AuthQueryService } from '../services/auth.query.service';
import { FirebaseAuthQueryService } from '../firebase-auth-query.service';
import { AuthControllerModule } from './auth.controller.module';
import { AuthResolver } from '../resolvers/auth.resolver';
import { AuthAdminResolver } from '../resolvers/auth.admin.resolver';
import { authRelationQueryService } from '../services/auth-relation-query.service';
import { AuthFirebaseModule } from '@app/auth/modules/auth-firebase.module';

interface ModuleOpts {
  imports: Array<
    Class<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  EntityClass: Class<any>;
}

@Global()
@Module({})
export class AuthModule<DTO> {
  static forFeature(opts: ModuleOpts): DynamicModule {
    const clazz = authRelationQueryService(opts.EntityClass);

    const provider = {
      provide: authRelationQueryService.getServiceToken(opts.EntityClass),
      useClass: clazz,
    };
    return {
      module: AuthModule,
      imports: [AuthFirebaseModule, AuthControllerModule, ...opts.imports],
      providers: [
        provider,
        AuthQueryService,
        FirebaseAuthQueryService,
        AuthResolver,
        AuthAdminResolver,
      ],
      exports: [provider, AuthQueryService, AuthFirebaseModule],
    };
  }
}

export function InjectAuthoredQueryService<DTO>(
  DTOClass: Class<DTO>,
): ParameterDecorator {
  return Inject(authRelationQueryService.getServiceToken(DTOClass));
}
