import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { AuthGuards } from '../guards/auth.guard';
import { NewsRequest } from './dto/news-request.dto';
import { UpdateNewsRequest } from './dto/update-request';

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
  @Post(':id')
  @UseGuards(AuthGuards)
  @ApiBearerAuth()
  updateList(@Param('id') id: number, @Body() updateDto: UpdateNewsRequest) {
    return this.newsService.update(id, updateDto);
  }
}
