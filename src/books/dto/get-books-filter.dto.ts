import { BookCondition } from '../book-condition.enum';

export class GetBooksFilterDto {
  condition?: BookCondition;
  search?: string;
}
