import { PartialType } from '@nestjs/swagger';
import { NewsRequest } from './news-request.dto';

export class UpdateNewsRequest extends PartialType(NewsRequest) {}
