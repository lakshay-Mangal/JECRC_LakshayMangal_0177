import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  providers: []
})
export class Cart {
  constructor(private cartService :CartService) {}

  getCartItems(){
    return this.cartService.getCartItems();
  }

  addToCart(Product: any){
    this.cartService.addToCart(Product.name);
  }
  clearCart() {
  this.cartService.clearCart();
}
}
