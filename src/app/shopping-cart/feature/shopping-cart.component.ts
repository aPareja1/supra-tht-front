import { Component, OnDestroy, OnInit } from '@angular/core';
import { cartData } from '../use-cases/checkout/cart-data';
import { Product } from '../domain/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  products = cartData;
  selectedProduct: Product | undefined = undefined;
  constructor() {
    console.log('ShoppingCartComponent created');
  }
  ngOnInit(): void {
  const randomIndex = Math.floor(Math.random() * this.products.Products.length);
  this.selectedProduct = Product.create(this.products.Products[randomIndex]);
  console.log(this.selectedProduct);
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}


