import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { AddQuoteComponent } from './pages/add-quote/add-quote.component';
import { EditQuoteComponent } from './pages/edit-quote/edit-quote.component';
import { AddBookComponent } from './pages/add-book/add-book.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: 'add-quote', component: AddQuoteComponent },
  { path: 'edit-quote/:id', component: EditQuoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
