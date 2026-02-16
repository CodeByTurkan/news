import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { AuthGuards } from '../guards/auth.guard';
import { NewsRequest } from './dto/news-request.dto';
import { UpdateNewsRequest } from './dto/update-request';
import { ListNews } from './dto/list-news.dto';
import { NewsActionTypes } from './news.types';
import { type AuthorizedUser } from '../auth/auth.types';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  getList(@Query() queryDto: ListNews) {
    return this.newsService.list(queryDto);
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

  // /api/category /: categoryId / news or /api/news?categoryId=id -query
  //api/news?category=1&color=black
  //api/news/:id - params
  //api/news - body

  //api/news/:newsId/action

  // @Post(':id/like')
  // @UseGuards(AuthGuards)
  // @ApiBearerAuth()
  // like(@Param('id') id: string) {
  //   return this.newsService.like(+id);
  // }
  // // We use id: string because that’s what the URL gives us, and we use +id so the service gets an actual number. Writing id: number doesn’t change the runtime value; conversion is still required.

  // @Post(':id/dislike')
  // @UseGuards(AuthGuards)
  // @ApiBearerAuth()
  // dislike(@Param('id') id: string) {
  //   return this.newsService.dislike(+id);
  // }

  @Post(':id/actions/:type')
  @UseGuards(AuthGuards)
  @ApiBearerAuth()
  action(
    @Param('id') id: number,
    @Param('type') type: NewsActionTypes,
    @Req() req: AuthorizedUser,
  ) {
    return this.newsService.action(id, type, req.user.id);
  }
}
