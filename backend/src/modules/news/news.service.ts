import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NewsEntities } from '../../entities/news.entities';
import { NewsRequest } from './dto/news-request.dto';
import { CategoryService } from '../category/category.service';
import { UpdateNewsRequest } from './dto/update-request';
import { ListNews } from './dto/list-news.dto';
import { NewsActionTypes } from './news.types';
import { NewsActionEntity } from '../../entities/newsActionHistory.entities';

@Injectable()
export class NewsService {
  constructor(
    private readonly categoryService: CategoryService,
    @InjectRepository(NewsEntities)
    private readonly newsEntity: Repository<NewsEntities>,
    @InjectRepository(NewsActionEntity)
    private readonly newsAction: Repository<NewsActionEntity>,
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

  // async like(id: number) {
  //   const news = await this.newsEntity.findOne({ where: { id } });
  //   if (!news) throw new NotFoundException('like not found');
  //   await this.newsEntity.increment({ id }, 'like', 1);
  //   return this.newsEntity.findOne({ where: { id } });
  // }

  // async dislike(id: number) {
  //   const news = await this.newsEntity.findOne({ where: { id } });
  //   if (!news) throw new NotFoundException('dislike not found');
  //   await this.newsEntity.increment({ id }, 'dislike', 1);
  //   return this.newsEntity.findOne({ where: { id } });
  // }

  async action(newsId: number, type: NewsActionTypes, userId: number) {
    const findNews = await this.newsEntity.findOne({ where: { id: newsId } });
    if (!findNews) throw new NotFoundException('news is not found');
    const checkAction = await this.newsAction.findOne({
      where: { newsId: newsId, userId: userId, actionTypes: type },
    });
    let increaseValue = 1;
    if (checkAction) {
      await checkAction.remove();
      increaseValue = -1;
    } else {
      await this.newsAction.save({
        newsId: newsId,
        userId: userId,
        actionTypes: type,
      });
    }
    switch (type) {
      case NewsActionTypes.LIKE:
        await this.newsEntity.increment({ id: newsId }, 'like', increaseValue);
        break;
      case NewsActionTypes.DISLIKE:
        await this.newsEntity.increment(
          { id: newsId },
          'dislike',
          increaseValue,
        );
        break;
      case NewsActionTypes.VIEW:
        await this.newsEntity.increment({ id: newsId }, 'view', increaseValue);
        break;

      default:
        throw new BadRequestException('Provided action is invalid');
        break;
    }
    return {
      message:
        increaseValue === 1 ? 'Action is performed' : 'Action is deleted',
    };
  }
}
