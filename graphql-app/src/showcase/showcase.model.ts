import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('showcase')
export class ShowcaseModel {
  @PrimaryGeneratedColumn()
  id: number;
}
