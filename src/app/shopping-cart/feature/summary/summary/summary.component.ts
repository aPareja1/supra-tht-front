import { Component } from '@angular/core';
import { CartEventService } from '../../../subscribers/cartEventService';
import { Cart } from '../../../domain/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  cart: Cart | null = null;
  constructor(private cartEventService : CartEventService){
    this.cartEventService.cartCreated$.subscribe((cart) => {
      this.cart = cart;
      console.log(cart);
    });

  }
}
