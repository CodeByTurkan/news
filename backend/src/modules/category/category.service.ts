import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/category.entities';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRequestDto } from './dto/category-request';
import { UpdateCategoryRequestDto } from './dto/update-request';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  findById(categoryId: number) {
    return this.categoryRepo.findOne({ where: { id: categoryId } });
  }

  list() {
    return this.categoryRepo.find();
  }
  create(categoryRequestDto: CategoryRequestDto) {
    const newCategory = this.categoryRepo.create(categoryRequestDto);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, updateDto: UpdateCategoryRequestDto) {
    const findNews = await this.categoryRepo.findOne({ where: { id } });
    if (!findNews) throw new NotFoundException('Category is not being found');
    // return this.categoryRepo.update(id, updateDto); or
    await this.categoryRepo.update({ id }, updateDto);
    // object form of the same thign - id, but there it becomes {id: id}
    return { message: 'Category is being updated succesfully' };
  }

  async delete(id: number) {
    const deleteNews = await this.categoryRepo.delete({ id });
    if (deleteNews.affected === 0) {
      throw new NotFoundException('There isnt such category');
    }
    return { message: 'Category deleted succesfully' };
  }
}
