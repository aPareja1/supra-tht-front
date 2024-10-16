import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PaymentRequestDTO } from '../domain/payment-request.dto';
import { PaymentResponseDto } from '../domain/payment-response.dto';
import { CurrencyBalanceDTO, PaymentInfoDTO } from '../domain/payment-info.dto';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpService: HttpClient) {
   }

   startPayment(paymentRequest: PaymentRequestDTO): Promise<PaymentResponseDto> {
    return firstValueFrom(this.httpService.post<PaymentResponseDto>(`${environment.BACKEND_URL}/payment`, paymentRequest));
  }
  getPaymentInfo(id: string): Promise<{payment: PaymentInfoDTO, balance: CurrencyBalanceDTO[]}>{
    return firstValueFrom(this.httpService.get<{payment: PaymentInfoDTO, balance: CurrencyBalanceDTO[]}>(`${environment.BACKEND_URL}/payment/${id}`));
  }
}
