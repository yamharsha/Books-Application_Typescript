import { Injectable } from '@angular/core';
import { Book } from '../../models/Book';
import axios from 'axios';
import { axiosAuth } from '../../config/AxiosAuth';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private books: Book[] = [];

  constructor() {}

  async getBooks() {
    try {
      const { data } = await axios.get(`http://localhost:5000/books`);
      this.books = data;

      return data;
    } catch (err) {
      console.error(err);
      return this.books;
    }
  }

  getBookById(editId: string): Book | null {
    const findBook = this.books.find((book) => book.id === editId);
    return findBook ? findBook : null;
  }

  async createBook(newBook: Partial<Book>): Promise<void> {
    try {
      const { data }: { data: Book } = await axiosAuth.post(
        `http://localhost:5000/books`,
        newBook
      );
      this.books.push(data);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteBook(deleteId: string): Promise<Book[]> {
    try {
      const { data } = await axiosAuth.delete(
        `http://localhost:5000/books/${deleteId}`
      );
      const filtredBook = this.books.filter((book) => book.id !== deleteId);
      this.books = filtredBook;
      console.log(data);
      return this.books;
    } catch (err) {
      console.error(err);
      return this.books;
    }
  }

  async updateBookItem(bookId: string, updatedBook: Book): Promise<void> {
    try {
      const { data } = await axiosAuth.put(
        `http://localhost:5000/books/${bookId}`,
        updatedBook
      );
      const editedBooks = this.books.map((book) => {
        if (book.id === bookId) {
          return { ...updatedBook };
        }
        return book;
      });
      console.log(data);
      this.books = editedBooks;
    } catch (err) {
      console.error(err);
    }
  }
}
