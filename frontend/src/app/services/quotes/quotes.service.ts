import { Injectable } from '@angular/core';
import { Quote } from '../../models/Quote';
import { axiosAuth } from '../../config/AxiosAuth';

interface QuoteData {
  quoteText: string;
  quotee: string;
}
@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private quotes: Quote[] = [];
  constructor() {}

  async getQuotes(): Promise<Quote[]> {
    try {
      const { data }: { data: Quote[] } = await axiosAuth.get(
        `http://localhost:5000/quotes`
      );
      this.quotes = data;
      return this.quotes;
    } catch (err) {
      console.error(err);
      return this.quotes;
    }
  }

  async createNewQuote(newQuote: Partial<Quote>): Promise<void> {
    try {
      const { data }: { data: Quote } = await axiosAuth.post(
        `http://localhost:5000/quotes`,
        newQuote
      );
      this.quotes.push(data);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteQuote(quoteId: string): Promise<Quote[]> {
    try {
      const { data } = await axiosAuth.delete(
        `http://localhost:5000/quotes/${quoteId}`
      );
      const filterQuotes = this.quotes.filter((quote) => quote.id !== quoteId);
      this.quotes = filterQuotes;
      console.log(data);
      return filterQuotes;
    } catch (err) {
      console.error(err);
      return this.quotes;
    }
  }

  async editQuote(quoteId: string, updatedQuote: Quote): Promise<void> {
    try {
      const { data } = await axiosAuth.put(
        `http://localhost:5000/quotes/${quoteId}`,
        updatedQuote
      );
      const editedQuote = this.quotes.map((quote) => {
        if (quote.id === quoteId) {
          return { ...updatedQuote };
        }
        return quote;
      });
      this.quotes = editedQuote;
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  getQuoteById(editId: string): Quote | null {
    const findQuote = this.quotes.find((quote) => quote.id === editId);
    return findQuote ? findQuote : null;
  }
}
