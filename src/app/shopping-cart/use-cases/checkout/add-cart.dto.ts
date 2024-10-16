import { Product } from "../../domain/product";


export interface AddCartDto {
  product: Product;
  quantity: number;
}
