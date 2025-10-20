import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { UserEnums } from '../shared/enums/user.types';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'enum', enum: UserEnums, default: UserEnums.MALE })
  password: UserEnums;
}
