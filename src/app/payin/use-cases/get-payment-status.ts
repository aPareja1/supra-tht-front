import { Injectable } from '@angular/core';

import { PaymentService } from '../services/payment.service';
import { CurrencyBalanceDTO, PaymentInfoDTO } from '../domain/payment-info.dto';

@Injectable({
  providedIn: 'root',
})
export class GetPaymentStatusUseCase {
  constructor(private paymentService: PaymentService) {}

  async execute(id: string): Promise<{payment: PaymentInfoDTO, balance: CurrencyBalanceDTO[]}> {
    const response = await this.paymentService.getPaymentInfo(id);
    return response;
  }
}
