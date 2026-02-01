import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
