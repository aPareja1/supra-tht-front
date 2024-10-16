import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../domain/cart';

@Injectable({
  providedIn: 'root',
})
export class CartEventService {
  private cartCreatedSource = new BehaviorSubject<Cart>({} as Cart);
  cartCreated$ = this.cartCreatedSource.asObservable();
  emitCartCreated(cart: Cart) {
    this.cartCreatedSource.next(cart);
  }
}
