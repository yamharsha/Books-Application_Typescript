import { Component } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BooksService } from 'src/app/services/books/books.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  listBooks: Book[] = [];

  authUser: User | null = null;

  constructor(
    private booksServie: BooksService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const authorized = await this.authService.getAuthorization();
    if (authorized !== null) {
      this.authUser = authorized;
    }
    const getBookAll = await this.booksServie.getBooks();
    this.listBooks = getBookAll;
  }

  async deleteBook(deleteId: string): Promise<void> {
    const deletedResult: Book[] = await this.booksServie.deleteBook(deleteId);
    this.listBooks = deletedResult;
  }

  routeToEditBook(bookId: string) {
    this.router.navigate([`edit-book/${bookId}`]);
  }

  userSignOut(): void {
    this.authUser = this.authService.SignOutUser();
  }

  returnDateString(date: string): string {
    const eventDate = new Date(date);
    const newDate = eventDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return newDate;
  }
}
