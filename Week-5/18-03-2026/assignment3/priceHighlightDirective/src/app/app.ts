import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceDirective } from './price'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PriceDirective], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  products = [
    { name: 'MacBook Pro', price: 120000 },
    { name: 'Smartphone', price: 45000 },
    { name: 'Gaming Monitor', price: 55000 },
    { name: 'Wireless Mouse', price: 1500 }
  ];
}