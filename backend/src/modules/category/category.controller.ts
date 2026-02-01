import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category-request';
import { AuthGuards } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getList() {
    return this.categoryService.list();
  }
  @Post('create')
  @UseGuards(AuthGuards)
  @ApiBearerAuth()
  createList(@Body() categoryDto: CategoryDto) {
    return this.categoryService.create(categoryDto);
  }
}
