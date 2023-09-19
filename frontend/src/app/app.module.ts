import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { FormsModule } from '@angular/forms';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { AddQuoteComponent } from './pages/add-quote/add-quote.component';
import { EditQuoteComponent } from './pages/edit-quote/edit-quote.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { QuoteFormComponent } from './components/quote-form/quote-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    QuotesComponent,
    SignUpComponent,
    AddBookComponent,
    EditBookComponent,
    AddQuoteComponent,
    EditQuoteComponent,
    NavBarComponent,
    DatepickerComponent,
    BookFormComponent,
    QuoteFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
