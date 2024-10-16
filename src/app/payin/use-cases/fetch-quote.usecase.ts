import { Injectable } from '@angular/core';
import { QuoteService } from '../services/quote.service';
import { Observable } from 'rxjs';
import { QuoteDTO } from '../domain/quote.dto';
import { CreateQuoteDto } from '../domain/create-quote.dto';

@Injectable({
  providedIn: 'root',
})
export class FetchQuoteUseCase {
  constructor(private quoteService: QuoteService) {}

  async execute(createQuote: CreateQuoteDto): Promise<QuoteDTO> {
    return await this.quoteService.postQuote(createQuote);
  }
}
