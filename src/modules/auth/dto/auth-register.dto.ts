import { UserEnums } from '../../../shared/enums/user.types';
import {
  IsString,
  IsEnum,
  IsOptional,
  Length,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterDto {
  @Type()
  @IsString()
  @Length(5, 30)
  @ApiProperty({ default: 'Turkan' })
  username: string;

  @Type()
  @IsString()
  @MinLength(6)
  @ApiProperty({ default: 'admin123' })
  password: string;

  @Type()
  @IsEnum(UserEnums)
  @ApiProperty({ default: UserEnums.FEMALE })
  gender: UserEnums;

  @Type()
  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, default: 'Turkan Isayeva  ' })
  fullname: string;
}
