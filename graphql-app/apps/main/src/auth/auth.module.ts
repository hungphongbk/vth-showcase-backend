import {
  Class,
  DeepPartial,
  InjectQueryService,
  QueryService,
  RelationQueryService,
} from '@nestjs-query/core';
import {
  DynamicModule,
  ForwardReference,
  Global,
  Inject,
  Injectable,
  Module,
} from '@nestjs/common';
import { AuthQueryService } from './auth.query.service';
import { AuthAssembler } from './auth.assembler';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthQueryService } from './firebase-auth-query.service';
import { AuthControllerModule } from './modules/auth.controller.module';
import { FirebaseStrategy } from './firebase.strategy';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthAdminResolver } from './resolvers/auth.admin.resolver';

function creator<DTO, C = DeepPartial<DTO>>(EntityClass: Class<any>) {
  @Injectable()
  class AuthRelationQueryService extends RelationQueryService<DTO, C> {
    constructor(
      @InjectQueryService(EntityClass) service: QueryService<DTO>,
      private readonly authQueryService: AuthQueryService,
    ) {
      super(service, {
        author: {
          service: authQueryService,
          query: (dto) => {
            return {
              filter: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                uid: { eq: dto.authorUid },
              },
            };
          },
        },
      });
    }
  }

  return AuthRelationQueryService;
}

interface ModuleOpts {
  imports: Array<
    Class<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  EntityClass: Class<any>;
}

function getServiceToken(DTOClass: { name: string }) {
  return `${DTOClass.name}AuthoredQueryService`;
}

@Global()
@Module({})
export class AuthModule<DTO> {
  static forFeature(opts: ModuleOpts): DynamicModule {
    const clazz = creator(opts.EntityClass);

    const provider = {
      provide: getServiceToken(opts.EntityClass),
      useClass: clazz,
    };
    return {
      module: AuthModule,
      imports: [
        PassportModule.register({ defaultStrategy: 'firebase' }),
        AuthControllerModule,
        ...opts.imports,
      ],
      providers: [
        provider,
        AuthQueryService,
        AuthAssembler,
        FirebaseAuthQueryService,
        FirebaseStrategy,
        AuthResolver,
        AuthAdminResolver,
      ],
      exports: [provider, AuthQueryService, FirebaseStrategy],
    };
  }
}

export function InjectAuthoredQueryService<DTO>(
  DTOClass: Class<DTO>,
): ParameterDecorator {
  return Inject(getServiceToken(DTOClass));
}
