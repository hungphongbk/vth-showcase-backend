import { registerEnumType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ShowcaseDto } from '../data-modules/showcase/dtos/showcase.dtos';
import { ShowcaseEntity } from '../data-modules/showcase/entities/showcase.entity';

export enum AuthRoleType {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  INVESTOR = 'investor',
  USER = 'user',
}
registerEnumType(AuthRoleType, {
  name: 'AuthRoleType',
});

@Entity('user')
export class AuthEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  uid: string;

  @Column()
  name: string;

  @OneToMany(() => ShowcaseEntity, (obj) => obj.author)
  showcasePosts: ShowcaseDto[];

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: AuthRoleType,
    default: AuthRoleType.USER,
    nullable: false,
  })
  role!: AuthRoleType;
}
