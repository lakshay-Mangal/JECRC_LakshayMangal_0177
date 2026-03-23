import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cart } from "./cart/cart";
import { Checkout } from "./checkout/checkout";
import { ProductList } from "./product-list/product-list";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ Cart, Checkout, ProductList,CommonModule],
  template: `
  <h1> E-Commerce App</h1>
  <div class="container">
  <app-product-list></app-product-list>
  <app-cart></app-cart>
  <app-checkout></app-checkout>
  </div>`,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce-app');
}
