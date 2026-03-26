import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cart } from "./cart/cart";
import { Products } from "./products/products";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cart, Products],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('multiCartApp');
}
