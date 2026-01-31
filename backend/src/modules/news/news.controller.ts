import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { AuthGuards } from '../guards/auth.guard';
import { NewsRequest } from './dto/news-request.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  getList() {
    return this.newsService.list();
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuards)
  @Post('create')
  createList(@Body() newsDto: NewsRequest) {
    return this.newsService.create(newsDto);
  }
}
