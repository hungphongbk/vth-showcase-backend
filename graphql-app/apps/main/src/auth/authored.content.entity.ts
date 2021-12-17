import { Column, Index } from 'typeorm';

export function AuthoredContentEntity() {
  abstract class AuthoredContentEntityClass {
    @Column()
    @Index()
    authorUid!: string;
  }
  return AuthoredContentEntityClass;
}
