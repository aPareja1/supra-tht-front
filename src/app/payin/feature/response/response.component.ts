import { Component } from '@angular/core';
import { readObjectFromBase64 } from '../../../shared/utils';
import { GetPaymentStatusUseCase } from '../../use-cases/get-payment-status';
import Swal from 'sweetalert2'
import { PaymentStatus } from '../../domain/payment-status.enum';
import { CurrencyBalanceDTO } from '../../domain/payment-info.dto';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
interface PaymentInfo {
  id: string;
  // Add other properties if needed
}

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent {
  balanceInfo: CurrencyBalanceDTO[] = [];
  constructor(private readonly getPaymentStatus: GetPaymentStatusUseCase, private readonly router: Router) {
    this.getPaymentInfo();
  }

  async getPaymentInfo() {
    const data = readObjectFromBase64('paymentInfo') as PaymentInfo;
    if (data) {
      const {payment, balance} = await this.getPaymentStatus.execute(data.id);
      console.log(payment, balance);
      if(payment.status ===  PaymentStatus.PAID){
        Swal.fire('Pago exitoso', 'Tu pago se ha procesado de manera exitosa', 'success');
        this.balanceInfo = balance;
      }
      if(payment.status === PaymentStatus.CREATED){
        await Swal.fire('Pago sin procesar', 'Tu pago no se ha procesado, serás redirigido a la pasarela', 'info');
        window.location.href = payment.paymentLink;
      }
    } else {
      this.router.navigate(['/']);
    }
  }
}
