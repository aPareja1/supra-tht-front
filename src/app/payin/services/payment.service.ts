import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateQuoteDto } from '../domain/create-quote.dto';
import { QuoteDTO } from '../domain/quote.dto';
import { firstValueFrom } from 'rxjs';
import { PaymentRequestDTO } from '../domain/payment-request.dto';
import { PaymentResponseDto } from '../domain/payment-response.dto';
import { CurrencyBalanceDTO, PaymentInfoDTO } from '../domain/payment-info.dto';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpService: HttpClient) {
   }

   startPayment(paymentRequest: PaymentRequestDTO): Promise<PaymentResponseDto> {
    return firstValueFrom(this.httpService.post<PaymentResponseDto>('http://localhost:3000/payment', paymentRequest));
  }
  getPaymentInfo(id: string): Promise<{payment: PaymentInfoDTO, balance: CurrencyBalanceDTO[]}>{
    return firstValueFrom(this.httpService.get<{payment: PaymentInfoDTO, balance: CurrencyBalanceDTO[]}>(`http://localhost:3000/payment/${id}`));
  }
}
