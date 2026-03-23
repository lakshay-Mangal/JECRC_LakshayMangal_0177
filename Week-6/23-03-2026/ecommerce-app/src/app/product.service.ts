import { Injectable } from '@angular/core';
import { product} from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(): Product[] {
    return[
      new Product (1,'Laptop',999.99),
      new Product (2, 'SmartPhone', 499.99),
      new Product (3, 'HeadPhones', 199.99)
    ]
  }
}
