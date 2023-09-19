import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quote } from 'src/app/models/Quote';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css'],
})
export class QuoteFormComponent {
  @Input() inputQuote!: Partial<Quote>;

  @Input() formTitle!: string;

  @Input() formSubTitle!: string;

  @Output() submitQuote = new EventEmitter();

  onSubmitQuote() {
    this.submitQuote.emit(this.inputQuote);
  }
}
