import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { UserEnums } from '../shared/enums/user.types';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserEnums, default: UserEnums.MALE })
  gender: UserEnums;

  @Column({ nullable: true })
  fullname: string;
}
