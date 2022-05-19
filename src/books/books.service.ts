import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { BookCondition } from './book-condition.enum';
import { Book } from './book.entity';
import { BooksRepository } from './books.repository';
import { AddBookDto } from './dto/add-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksRepository) private booksRepository: BooksRepository,
  ) {}

  getBooks(filterDto: GetBooksFilterDto, user: User): Promise<Book[]> {
    return this.booksRepository.getBooks(filterDto, user);
  }

  async getBookById(id: string, user: User): Promise<Book> {
    const found = await this.booksRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async addBook(addBookDto: AddBookDto, user: User): Promise<Book> {
    return this.booksRepository.addBook(addBookDto, user);
  }

  async deleteBook(id: string, user: User): Promise<void> {
    const result = await this.booksRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Taks with ID "${id}" not found`);
    }
  }

  async updateBookCondition(
    id: string,
    condition: BookCondition,
    user: User,
  ): Promise<Book> {
    const book = await this.getBookById(id, user);

    book.condition = condition;
    await this.booksRepository.save(book);

    return book;
  }
}
