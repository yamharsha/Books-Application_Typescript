import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quote } from 'src/app/models/Quote';
import { QuotesService } from 'src/app/services/quotes/quotes.service';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.css'],
})
export class EditQuoteComponent {
  editQuote: Quote | null = null;

  editQuoteInput: Partial<Quote> = {
    quoteText: '',
    quotee: '',
  };

  constructor(
    private quoteService: QuotesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const paramId = this.activeRoute.snapshot.params['id'];
    const getOneQuote = this.quoteService.getQuoteById(paramId);
    if (getOneQuote !== null) {
      this.editQuoteInput = {
        quoteText: getOneQuote.quoteText,
        quotee: getOneQuote.quotee,
      };
      this.editQuote = getOneQuote;
    } else {
      this.router.navigate(['/']);
    }
  }

  async submitEditQuote(): Promise<void> {
    if (this.editQuote !== null) {
      const updatedQuote = { ...this.editQuote, ...this.editQuoteInput };
      await this.quoteService.editQuote(this.editQuote.id, updatedQuote);
    }
    this.router.navigate(['/quotes']);
  }
}
