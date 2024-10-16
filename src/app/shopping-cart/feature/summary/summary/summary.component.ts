import { Component } from '@angular/core';
import { CartEventService } from '../../../subscribers/cartEventService';
import { Cart } from '../../../domain/cart';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  cart: Cart | null = null;
  constructor(private cartEventService : CartEventService, private router: Router){
    this.cartEventService.cartCreated$.subscribe((cart) => {
      this.cart = cart;
    });

  }

  goToCheckout(){
    if(this.cart){
      this.router.navigate(['/quote']);
    }
  }
}
