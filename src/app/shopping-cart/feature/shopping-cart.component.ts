import { Component, OnDestroy, OnInit } from '@angular/core';
import { cartData } from '../use-cases/checkout/cart-data';
import { Product } from '../domain/product';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CreateCartUseCase } from '../use-cases/checkout/add-cart.usecase';
import { SummaryComponent } from './summary/summary/summary.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    SummaryComponent
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  products = cartData;
  selectedProduct: Product | undefined = undefined;
  subscription = new Subscription();
  constructor(private createCartUseCase : CreateCartUseCase) {
    console.log('ShoppingCartComponent created');
  }

  setQuantity(event:any){
    const quantity = event.target.value;
    this.dispatchUseCase(quantity);
  }
  ngOnInit(): void {
  const randomIndex = Math.floor(Math.random() * this.products.Products.length);
  this.selectedProduct = Product.create(this.products.Products[randomIndex]);
  this.dispatchUseCase(1);
  }

  dispatchUseCase(quantity: number){
    if(this.selectedProduct){
      this.subscription.add(this.createCartUseCase.execute({product: this.selectedProduct, quantity}).subscribe());
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


