import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { AddBookDto } from './dto/add-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { UpdateBookConditionDto } from './dto/update-book-condition.dto';

@Controller('books')
@UseGuards(AuthGuard())
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getBooks(@Query() filterDto: GetBooksFilterDto): Promise<Book[]> {
    return this.booksService.getBooks(filterDto);
  }

  @Get('/:id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  @Post()
  addBook(
    @Body() addBookDto: AddBookDto,
    @GetUser() user: User,
  ): Promise<Book> {
    return this.booksService.addBook(addBookDto, user);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }

  @Patch('/:id/status')
  updateBookCondition(
    @Param('id') id: string,
    @Body() updateBookConditionDto: UpdateBookConditionDto,
  ): Promise<Book> {
    const { condition } = updateBookConditionDto;
    return this.booksService.updateBookCondition(id, condition);
  }
}
