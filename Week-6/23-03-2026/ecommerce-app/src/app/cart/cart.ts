import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  constructor(public cartService: CartService){}

  get Total(){
    return this.cartService.getTotal();
  }
}
