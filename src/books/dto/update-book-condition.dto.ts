import { IsEnum } from 'class-validator';
import { BookCondition } from '../book-condition.enum';

export class UpdateBookConditionDto {
  @IsEnum(BookCondition)
  condition: BookCondition;
}
