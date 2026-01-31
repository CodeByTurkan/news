import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntities } from '../../entities/news.entities';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntities])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
