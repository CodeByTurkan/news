import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntities } from '../../entities/news.entities';
import { NewsRequest } from './dto/news-request.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntities)
    private readonly newsEntity: Repository<NewsEntities>,
  ) {}

  list() {
    return this.newsEntity.find();
  }

  create(newsDto: NewsRequest) {
    const newItem = this.newsEntity.create({
      ...newsDto,
      views: 0,
      like: 0,
      dislike: 0,
    });

    return this.newsEntity.save(newItem);
  }
}
