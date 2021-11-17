import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class MediaInterceptor implements NestInterceptor {
  fileInterceptor: NestInterceptor;

  constructor(configService: ConfigService) {
    const filesDestination = configService.get('UPLOADED_FILES_DESTINATION');
    this.fileInterceptor = new (FileInterceptor('file', {
      storage: diskStorage({
        destination: filesDestination,
      }),
    }))();
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return this.fileInterceptor.intercept(context, next);
  }
}
