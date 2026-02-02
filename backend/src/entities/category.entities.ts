import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NewsEntities } from './news.entities';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // oldugumuz ve qosacagimiz => category and xeber
  @OneToMany(() => NewsEntities, (item: NewsEntities) => item.category)
  news: NewsEntities[];

  @Column()
  name: string;

  @Column()
  slug: string;

  // The purpose of @BeforeInsert() and @BeforeUpdate() decorators is to automatically run logic before saving data to the database.
  @BeforeInsert()
  @BeforeUpdate()
  beforeUpsert() {
    if (!this.slug && this.name) {
      this.slug = this.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
  }
}
