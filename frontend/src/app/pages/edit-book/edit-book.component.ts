import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/models/Book';
import { BooksService } from 'src/app/services/books/books.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent {
  editBook: Book | null = null;

  editBookInput: Partial<Book> = {
    title: '',
    author: '',
    publishDate: '',
  };

  constructor(
    private booksServie: BooksService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const paramId = this.activeRoute.snapshot.params['id'];
    const getOneBook = await this.booksServie.getBookById(paramId);
    if (getOneBook !== null) {
      this.editBookInput = {
        title: getOneBook.title,
        author: getOneBook.author,
        publishDate: getOneBook.publishDate,
      };
      this.editBook = getOneBook;
    } else {
      this.router.navigate(['/']);
    }
  }

  datePickerValue(date: NgbDateStruct) {
    if (date !== null && date.year && date.month && date.day) {
      this.editBookInput.publishDate =
        date.year + '-' + date.month + '-' + date.day;
    } else {
      this.editBookInput.publishDate = '';
    }
  }

  async onSubmitEditBook() {
    if (this.editBook !== null) {
      const updatedBook: Book = { ...this.editBook, ...this.editBookInput };
      await this.booksServie.updateBookItem(this.editBook.id, updatedBook);
      this.router.navigate(['/']);
    }
  }
}
