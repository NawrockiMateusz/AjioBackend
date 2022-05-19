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
  getBooks(
    @Query() filterDto: GetBooksFilterDto,
    @GetUser() user: User,
  ): Promise<Book[]> {
    return this.booksService.getBooks(filterDto, user);
  }

  @Get('/:id')
  async getBookById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Book> {
    return this.booksService.getBookById(id, user);
  }

  @Post()
  addBook(
    @Body() addBookDto: AddBookDto,
    @GetUser() user: User,
  ): Promise<Book> {
    return this.booksService.addBook(addBookDto, user);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.booksService.deleteBook(id, user);
  }

  @Patch('/:id/status')
  updateBookCondition(
    @Param('id') id: string,
    @Body() updateBookConditionDto: UpdateBookConditionDto,
    @GetUser() user: User,
  ): Promise<Book> {
    const { condition } = updateBookConditionDto;
    return this.booksService.updateBookCondition(id, condition, user);
  }
}
