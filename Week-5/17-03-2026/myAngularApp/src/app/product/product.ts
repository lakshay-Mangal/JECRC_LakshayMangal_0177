import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  products= [
    {name: "Laptop", price: 50000},
    {name: "Mouse", price: 500},
    {name: "Speaker", price: 3000}
  ]
}
