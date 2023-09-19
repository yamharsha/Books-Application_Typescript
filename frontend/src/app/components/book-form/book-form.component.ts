import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent {
  @Input() bookInput!: Partial<Book>;

  @Input() formTitle!: string;

  @Input() formSubTitle!: string;

  @Output() submitBook = new EventEmitter();

  datePickerValue(date: NgbDateStruct) {
    if (date !== null && date.year && date.month && date.day) {
      this.bookInput.publishDate =
        date.year + '-' + date.month + '-' + date.day;
    } else {
      this.bookInput.publishDate = '';
    }
  }

  submitValue() {
    this.submitBook.emit(this.bookInput);
  }
}
