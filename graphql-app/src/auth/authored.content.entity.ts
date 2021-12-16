import { Column, Index } from 'typeorm';

export abstract class AuthoredContentEntity {
  @Column()
  @Index()
  authorUid!: string;
}
