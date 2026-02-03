import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NewsEntities } from '../../entities/news.entities';
import { NewsRequest } from './dto/news-request.dto';
import { CategoryService } from '../category/category.service';
import { UpdateNewsRequest } from './dto/update-request';
import { ListNews } from './dto/list-news.dto';

@Injectable()
export class NewsService {
  constructor(
    private readonly categoryService: CategoryService,
    @InjectRepository(NewsEntities)
    private readonly newsEntity: Repository<NewsEntities>,
  ) {}

  list(params: ListNews) {
    const where: FindOptionsWhere<NewsEntities> = {};
    // bura any de qoymaq olar amma best practice deyil, topleri bele tapmaq olar
    if (params.category) {
      where.categoryId = params.category;
    } //queryde category gonderilende,bu formada ?categoryId=3 sadece  hemen categoryideki xeberleri , desc orderla gotur, eks halda, where = {} oldugu ucun hamisini goster.
    return this.newsEntity.find({
      where,
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
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
