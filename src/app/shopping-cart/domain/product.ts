import { AggregateRoot } from "../../core/domain/AggregateRoot";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}


export class Product extends AggregateRoot<ProductProps> {
  private constructor(props: ProductProps, id?: string) {
    super(props, id);
  }


  get name() {
    return this.props.name;
  }

  get price() {
    return this.props.price;
  }

  get description() {
    return this.props.description;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }


  public static create(props: ProductProps): Product {
    return new Product({...props});
  }
}
