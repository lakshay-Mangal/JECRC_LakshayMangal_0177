import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class ProductComponent {

  @Output() addToCart = new EventEmitter<any>();

  search = '';
  category = '';

  categories = ['Electronics', 'Clothing'];

  products = [
    { id: 1, name: 'Laptop', price: 50000, category: 'Electronics', quantity: 1 },
    { id: 2, name: 'Shirt', price: 1000, category: 'Clothing', quantity: 1 }
  ];

  filteredProducts() {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.search.toLowerCase()) &&
      (this.category ? p.category === this.category : true)
    );
  }

  add(product: any) {
    this.addToCart.emit({ ...product });
  }
}