import { Injectable } from "@angular/core";
import { UseCase } from "../../../core/domain/UseCase";
import { AddCartDto } from "./add-cart.dto";
import { Observable } from "rxjs";
import { AfterCartCreated } from "../../subscribers/afterCartCreated";
import { Cart } from "../../domain/cart";
import { CartEventService } from "../../subscribers/cartEventService";



@Injectable(
  {providedIn: 'root'}
)

export class CreateCartUseCase implements UseCase<AddCartDto, Observable<AddCartDto>> {
  constructor(private afterCartCreated: AfterCartCreated, private cartEventService: CartEventService ) {}

  execute(entryObject: AddCartDto): Observable<any> {
    let cart = null;
    if (entryObject) {
      const totalPrice = entryObject.quantity * entryObject.product.price;
      cart = Cart.create({
        products: Array(entryObject.quantity).fill(entryObject.product),
        total: totalPrice,
      });
      cart.createCart(this.afterCartCreated);
      this.afterCartCreated.onPipe()(
        cart.domainObserver
      ).subscribe({
        next: (updatedCart: any) => {
          this.cartEventService.emitCartCreated(updatedCart);
        }
      });
    }

    if (cart) {
      console.log('Cart has been created!');
      return cart.domainObserver;
    }

    return new Observable<Cart>((observer) => {
      observer.error(new Error('Cart creation failed'));
    });
  }
}
