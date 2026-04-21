// product.service.ts
import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(): Product[] {
    return [
      { id: 1, name: 'Laptop', category: 'Electronics', price: 850.50, stock: 10 },
      { id: 2, name: 'Desk Chair', category: 'Furniture', price: 150.00, stock: 5 },
      { id: 3, name: 'Headphones', category: 'Electronics', price: 99.99, stock: 0 },
      { id: 4, name: 'Monitor', category: 'Electronics', price: 200.00, stock: 12 },
      { id: 5, name: 'Coffee Table', category: 'Furniture', price: 300.00, stock: 3 },
    ];
  }
}