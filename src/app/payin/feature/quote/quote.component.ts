import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CartEventService } from '../../../shopping-cart/subscribers/cartEventService';
import { Subscription } from 'rxjs';
import { Cart } from '../../../shopping-cart/domain/cart';
import { isEmptyObject } from '../../../shared/utils';
import { Router } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { QuoteDTO } from '../../domain/quote.dto';
import { FetchQuoteUseCase } from '../../use-cases/fetch-quote.usecase';
import { CreateQuoteDto } from '../../domain/create-quote.dto';
import { StartPaymentUseCase } from '../../use-cases/start-payment.usecase';
import { PaymentRequestDTO } from '../../domain/payment-request.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule, MatButtonModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss'
})
export class QuoteComponent implements OnInit, OnDestroy {
  quoteForm: FormGroup;
  cartData: Cart | undefined = undefined;
  quote: QuoteDTO | undefined = undefined;
  expired: boolean = false;
  private readonly KEEP_QUOTE_TIME = 25;
  private subscription = new Subscription();

  private timer: any;
  timeLeft: number = this.KEEP_QUOTE_TIME * 60;

  private startTimer(): void {
    this.expired = false;
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.expired = true;
      }
    }, 1000);
  }

  private resetTimer(): void {
    clearInterval(this.timer);
    this.timeLeft = this.KEEP_QUOTE_TIME;
    this.startTimer();
  }



  constructor(
    private fetchQuoteUseCase: FetchQuoteUseCase,
    private router: Router,
    private fb: FormBuilder,
    private cartEventService: CartEventService,
    private readonly startPaymentUseCase : StartPaymentUseCase
  ) {
    this.quoteForm = this.createForm();
    this.subscribeToCartEvents();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      initialCurrency: ['', Validators.required],
      finalCurrency: ['', Validators.required],
      transactionCost: ['', Validators.required],
      finalAmount: ['', Validators.required],
      exchangeRate: ['', Validators.required],
      initialAmount: ['', Validators.required],
    });
  }

  private subscribeToCartEvents(): void {
    this.subscription.add(
      this.cartEventService.cartCreated$.subscribe((cart) => {
        if (isEmptyObject(cart)) {
          console.log('Cart is empty');
          this.router.navigate(['/']);
          return;
        }
        this.cartData = cart;
        this.loadQuote();
      })
    );
  }

  async loadQuote(): Promise<void> {
    if (!this.cartData) return;

    const quoteToSend: CreateQuoteDto = {
      initialCurrency: 'COP',
      finalCurrency: 'USD',
      finalAmount: this.cartData.total ?? 0,
    };

    try {
      this.showLoading('Cargando cotización');
      this.quote = await this.fetchQuoteUseCase.execute(quoteToSend);
      console.log(this.quote);
      this.setFormValues();
      this.resetTimer();
      Swal.close();
    } catch (err) {
      console.error(err);
    }
  }

  private setFormValues(): void {
    if (this.quote) {
      this.quoteForm.patchValue({
        initialCurrency: this.quote.finalCurrency,
        finalCurrency: this.quote.finalAmount,
        transactionCost: this.quote.transactionCost,
        finalAmount: this.quote.finalAmount,
        exchangeRate: this.quote.exchangeRate,
        initialAmount: this.quote.initialAmount,
      });
    }
  }

  async startPayment(){
    if (this.quote && !this.expired) {
      const paymentRequest: PaymentRequestDTO = {
        quoteId: this.quote.id,
        currency: this.quote.initialCurrency,
        amount: this.quote.initialAmount
      };
      try {
      this.showLoading('Iniciando el proceso de pago');
      const response = await this.startPaymentUseCase.execute(paymentRequest);
      Swal.close();
      window.location.href = response.paymentLink;
    } catch (error) {
        console.log(error);
      }
    }
  }

  showLoading(message: string): void {
    Swal.fire({
      title: message,
      text: 'Por favor espere...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
}
