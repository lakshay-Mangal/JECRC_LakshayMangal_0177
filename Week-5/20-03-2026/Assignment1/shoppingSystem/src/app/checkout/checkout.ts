import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
selector: 'app-checkout',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './checkout.html',
styleUrl: './checkout.css'
})
export class CheckoutComponent {

@Input() cartItems: any[] = [];

data: any = {};

placeOrder() {
console.log('Order Placed', this.data, this.cartItems);
alert('Order placed successfully!');
this.data = {};
}
}