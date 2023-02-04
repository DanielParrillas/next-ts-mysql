export interface NewProduct {
  name: string;
  price: number;
  description: string;
  created?: Date;
}

export interface Product extends NewProduct {
  readonly id: number;
  created: Date;
}
