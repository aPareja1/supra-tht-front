import { Injectable } from '@angular/core';
import { PaymentRequestDTO } from '../domain/payment-request.dto';
import { PaymentService } from '../services/payment.service';
import { saveObjectAsBase64 } from '../../shared/utils';
import { PaymentResponseDto } from '../domain/payment-response.dto';

@Injectable({
  providedIn: 'root',
})
export class StartPaymentUseCase {
  constructor(private paymentService: PaymentService) {}

  async execute(paymentRequest : PaymentRequestDTO): Promise<PaymentResponseDto> {
    const response = await this.paymentService.startPayment(paymentRequest);
    if(response){
      saveObjectAsBase64('paymentInfo', response);
    }
    return await this.paymentService.startPayment(paymentRequest);
  }
}
