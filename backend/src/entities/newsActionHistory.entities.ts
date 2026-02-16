import {
    BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NewsEntities } from './news.entities';
import { NewsActionTypes } from '../modules/news/news.types';
import { User } from './user.entities';

@Entity('NewsAction')
export class NewsActionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: number;
  // bu ikisni relationla birlesdirik.
  @Column()
  newsId: number;

  @OneToMany(() => NewsEntities, (item: NewsEntities) => item.actionsEntity)
  @JoinColumn({
    name: 'NewsId',
  })
  news: NewsEntities;

  @Column({ type: 'enum', enum: NewsActionTypes })
  actionTypes: NewsActionTypes;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'UserId',
  })
  user: User;
}
