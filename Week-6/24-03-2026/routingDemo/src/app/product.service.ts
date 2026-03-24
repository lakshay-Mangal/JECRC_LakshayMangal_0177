import { Injectable } from '@angular/core';
import { Product } from './product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {

  getProducts() : Product[]{
    return [
      new Product (1, 'Laptop',999.99),
      new Product (2, 'Mouse',99.99),
      new Product (3, 'Keyboard',199.99)
    ];
  }
  getProductById(id:number) : Product | undefined {
    return this.getProducts().find(p => p.productID ===id);
  }
}
