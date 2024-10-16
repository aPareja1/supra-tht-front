import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateQuoteDto } from '../domain/create-quote.dto';
import { QuoteDTO } from '../domain/quote.dto';
import { firstValueFrom } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private httpService: HttpClient) {
   }

   postQuote(quote: CreateQuoteDto): Promise<QuoteDTO> {
    return firstValueFrom(this.httpService.post<QuoteDTO>('http://localhost:3000/quote', quote));
  }
}
