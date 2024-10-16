import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateQuoteDto } from '../domain/create-quote.dto';
import { QuoteDTO } from '../domain/quote.dto';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private httpService: HttpClient) {
   }

   postQuote(quote: CreateQuoteDto): Promise<QuoteDTO> {
    return firstValueFrom(this.httpService.post<QuoteDTO>(`${environment.BACKEND_URL}/quote`, quote));
  }
}
