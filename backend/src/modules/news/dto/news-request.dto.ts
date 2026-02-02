import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsUrl,
  Length,
  Matches,
  IsOptional,
  IsInt,
} from 'class-validator';

export class NewsRequest {
  @Type()
  @IsString()
  @Length(5, 100)
  @ApiProperty({ default: 'title' })
  title: string;

  @Type()
  @IsString()
  @Length(5, 10000)
  @ApiProperty({ default: 'content' })
  content: string;

  @Type()
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Auto-generated from title if omitted',
  })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be lowercase alphanumeric with hyphens',
  })
  slug?: string;

  @Type()
  @IsUrl()
  @ApiProperty({
    default: 'https://images.unsplash.com/photo-1769607590916-70161e6020db',
  })
  thumbnail: string;

  @Type()
  @IsInt()
  @ApiProperty({ default: 1 })
  categoryId: number;
}
