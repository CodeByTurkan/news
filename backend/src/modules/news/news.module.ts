import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntities } from '../../entities/news.entities';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntities]), CategoryModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
