import { IsNotEmpty } from 'class-validator';

export class AddBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;
}
