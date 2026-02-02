import { PartialType } from '@nestjs/swagger';
import { CategoryRequestDto } from './category-request';

export class UpdateCategoryRequestDto extends PartialType(CategoryRequestDto) {}
