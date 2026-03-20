import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {

  @Input() cartItems: any[] = [];
  @Output() updateCart = new EventEmitter<any[]>();

  increase(item: any) {
    item.quantity++;
    this.updateCart.emit(this.cartItems);
  }

  decrease(item: any) {
    if (item.quantity > 1) item.quantity--;
    this.updateCart.emit(this.cartItems);
  }

  remove(item: any) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    this.updateCart.emit(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart.emit(this.cartItems);
  }

  total() {
    return this.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}