import { AuthGuard } from '@nestjs/passport';

export class ControllerAuthGuard extends AuthGuard('firebase') {}
