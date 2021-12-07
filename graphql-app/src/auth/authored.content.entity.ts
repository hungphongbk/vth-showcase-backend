import { JoinColumn, ManyToOne } from 'typeorm';
import { AuthEntity } from './auth.entity';

export function AuthoredContentEntity<
  T extends keyof AuthEntity = keyof AuthEntity,
>(relatedField: T) {
  abstract class AuthoredContentEntityClass {
    @ManyToOne(() => AuthEntity, (obj) => obj[relatedField])
    @JoinColumn({ name: 'authorUid' })
    author!: AuthEntity;
  }

  return AuthoredContentEntityClass;
}
