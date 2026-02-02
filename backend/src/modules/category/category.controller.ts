import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryRequestDto } from './dto/category-request';
import { AuthGuards } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateCategoryRequestDto } from './dto/update-request';

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
  createList(@Body() categoryRequestDto: CategoryRequestDto) {
    return this.categoryService.create(categoryRequestDto);
  }

  @Post(':id')
  @UseGuards(AuthGuards)
  @ApiBearerAuth()
  updateList(
    @Param('id') id: number,
    @Body() updateDto: UpdateCategoryRequestDto,
  ) {
    return this.categoryService.update(id, updateDto);
  }

  deleteList(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
