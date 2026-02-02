import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class CategoryRequestDto {
  @Type()
  @IsString()
  @Length(3, 15)
  @ApiProperty({ default: 'name-category' })
  name: string;

  @Type()
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    default: 'slug-category',
    description: 'Auto-generated from name if omitted',
  })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be lowercase alphanumeric with hyphens',
  })
  slug?: string;
}
