import { Component, computed, inject } from '@angular/core';
import { signal } from '@angular/core';
import { ProductService,Product } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private productService = inject(ProductService);

  // State Signals
  products = signal<Product[]>(this.productService.getProducts());
  selectedCategory = signal<string>('');
  appliedCategory = signal<string>('');
  showInStockOnly = signal<boolean>(false);
  sortAscending = signal<boolean | null>(null);

  // Categories for the dropdown
  categories = ['Electronics', 'Furniture'];

  // The Filtered Data Logic
  filteredProducts = computed(() => {
    let list = [...this.products()];

    // 1. Category Filter (Triggered by 'Filter' button)
    if (this.appliedCategory()) {
      list = list.filter(p => p.category === this.appliedCategory());
    }

    // 2. Stock Filter (Reactive toggle)
    if (this.showInStockOnly()) {
      list = list.filter(p => p.stock > 0);
    }

    // 3. Price Sorting
    if (this.sortAscending() !== null) {
      list.sort((a, b) => this.sortAscending() ? a.price - b.price : b.price - a.price);
    }

    return list;
  });

  applyFilter() {
    this.appliedCategory.set(this.selectedCategory());
  }

  toggleSort() {
    this.sortAscending.set(true); // Requirement: Sort in ascending order
  }
}
