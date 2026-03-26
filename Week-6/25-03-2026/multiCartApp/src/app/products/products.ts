import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
  providers: []
})
export class Products {
  products = [
    { id: 1, name: 'Laptop', price: 999},
    { id: 2, name: 'Smartphone', price: 499},
    { id: 3, name: 'Headphones', price: 199}
  ];

  constructor(private cartService: CartService){}

  addToCart(product: any){
    this.cartService.addToCart(product.name);
  }
  getCartItems(){
    return this.cartService.getCartItems();
  }
}