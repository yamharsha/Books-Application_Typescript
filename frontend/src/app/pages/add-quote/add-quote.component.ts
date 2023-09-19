import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Quote } from 'src/app/models/Quote';
import { AuthService } from 'src/app/services/auth/auth.service';
import { QuotesService } from 'src/app/services/quotes/quotes.service';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css'],
})
export class AddQuoteComponent {
  addQuoteInput: Partial<Quote> = {
    quoteText: '',
    quotee: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private quoteService: QuotesService
  ) {}

  async ngOnInit(): Promise<void> {
    const authorized = await this.authService.getAuthorization();
    if (authorized === null) {
      this.router.navigate(['/sign-in']);
    }
  }

  async submitCreateQuote() {
    await this.quoteService.createNewQuote(this.addQuoteInput);
    this.router.navigate(['/quotes']);
  }
}
