import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BooksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'library',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
