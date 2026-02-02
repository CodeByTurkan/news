import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntities } from '../../entities/news.entities';
import { NewsRequest } from './dto/news-request.dto';
import { CategoryService } from '../category/category.service';
import { UpdateNewsRequest } from './dto/update-request';

@Injectable()
export class NewsService {
  constructor(
    private readonly categoryService: CategoryService,
    @InjectRepository(NewsEntities)
    private readonly newsEntity: Repository<NewsEntities>,
  ) {}

  list() {
    return this.newsEntity.find();
  }

  async create(newsDto: NewsRequest) {
    const category = await this.categoryService.findById(newsDto.categoryId);
    if (!category) throw new NotFoundException('Category not found');
    const newItem = this.newsEntity.create({
      ...newsDto,
      views: 0,
      like: 0,
      dislike: 0,
    });

    return this.newsEntity.save(newItem);
  }

  async update(id: number, updateDto: UpdateNewsRequest) {
    const findNews = await this.newsEntity.findOne({ where: { id } });
    if (!findNews) throw new NotFoundException('News is not being found');
    if (updateDto.categoryId && updateDto.categoryId !== findNews.categoryId) {
      const category = await this.categoryService.findById(
        updateDto.categoryId,
      );
      if (!category) throw new NotFoundException('Category not found');
    }
    await this.newsEntity.update({ id }, updateDto);
    return { message: 'News is being updated succesfully' };
  }
}
