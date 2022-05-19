import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  condition: string;

  @ManyToOne((_type) => User, (user) => user.books, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
