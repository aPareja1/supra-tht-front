import { uuid } from "uuidv4";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { Product } from "./product";
import { v4 as uuidv4 } from 'uuid';
import { AfterCartCreated } from '../subscribers/afterCartCreated';


interface CartProps {
  products: Product[];
  total: number;
}

export class Cart extends AggregateRoot<CartProps> {
  private constructor(props: CartProps, id?: string) {
    super(props, id);
  }

  get products() {
    return this.props.products;
  }

  get total() {
    return this.props.total;
  }

  public static create(props: CartProps): Cart {
    if (!props.products || props.products.length === 0) {
      throw new Error('Cart must have at least one product');
    }
    if (!props.total) {
      throw new Error('Cart must have a total');
    }
    return new Cart({ ...props });
  }

  public createCart(afterCartCreated : AfterCartCreated){
    this.addDomainEvent(this);
    this.dispatchObserver(afterCartCreated.onPipe());
  }
}
