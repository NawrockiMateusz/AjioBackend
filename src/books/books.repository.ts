import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BookCondition } from './book-condition.enum';
import { Book } from './book.entity';
import { AddBookDto } from './dto/add-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {
  async getBooks(filterDto: GetBooksFilterDto): Promise<Book[]> {
    const { condition, search } = filterDto;
    const query = this.createQueryBuilder('book');

    if (condition) {
      query.andWhere('book.condition = :condition', { condition });
    }

    if (search) {
      query.andWhere(
        'LOWER(book.title) LIKE LOWER(:search) OR LOWER(book.author) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const books = await query.getMany();
    return books;
  }

  async addBook(addBookDto: AddBookDto, user: User): Promise<Book> {
    const { title, author } = addBookDto;

    const book = this.create({
      title,
      author,
      condition: BookCondition.NEW,
      user,
    });

    await this.save(book);
    return book;
  }
}
