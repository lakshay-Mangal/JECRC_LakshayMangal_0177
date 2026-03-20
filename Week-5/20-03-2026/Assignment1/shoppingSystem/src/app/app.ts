import { Component } from '@angular/core';
import { ProductComponent } from './product/product';
import { CartComponent } from './cart/cart';
import { CheckoutComponent } from './checkout/checkout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductComponent, CartComponent, CheckoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  cartItems: any[] = [];

  addToCart(product: any) {
    const existing = this.cartItems.find(p => p.id === product.id);

    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.cartItems.push(product);
    }
  }
}