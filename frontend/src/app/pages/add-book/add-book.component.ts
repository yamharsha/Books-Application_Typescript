import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/models/Book';
import { BooksService } from 'src/app/services/books/books.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  addBookInput: Partial<Book> = {
    title: '',
    author: '',
    publishDate: '',
  };

  constructor(private booksServie: BooksService, private router: Router) {}

  datePickerValue(date: NgbDateStruct) {
    if (date !== null && date.year && date.month && date.day) {
      this.addBookInput.publishDate =
        date.year + '-' + date.month + '-' + date.day;
    } else {
      this.addBookInput.publishDate = '';
    }
  }

  async onSubmitNewBook() {
    await this.booksServie.createBook(this.addBookInput);
    this.router.navigate(['/']);
  }
}
