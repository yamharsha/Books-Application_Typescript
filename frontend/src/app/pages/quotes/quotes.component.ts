import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Quote } from 'src/app/models/Quote';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { QuotesService } from 'src/app/services/quotes/quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent {
  listQuotes: Quote[] = [];

  authUser: User | null = null;

  constructor(
    private authService: AuthService,
    public router: Router,
    private quoteService: QuotesService
  ) {}

  async ngOnInit(): Promise<void> {
    const authorized = await this.authService.getAuthorization();
    if (authorized !== null) {
      this.authUser = authorized;
      this.listQuotes = await this.quoteService.getQuotes();
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  routeToEdit(id: string) {
    this.router.navigate([`/edit-quote/${id}`]);
  }

  async deleteQuote(id: string) {
    this.listQuotes = await this.quoteService.deleteQuote(id);
  }

  userSignOut(): void {
    this.authUser = this.authService.SignOutUser();
    this.router.navigate(['/']);
  }
}
