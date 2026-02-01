import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/category.entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category-request';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  list() {
    return this.categoryRepo.find();
  }
  create(categoryDto: CategoryDto) {
    const newCategory = this.categoryRepo.create(categoryDto);
    return this.categoryRepo.save(newCategory);
  }
}
