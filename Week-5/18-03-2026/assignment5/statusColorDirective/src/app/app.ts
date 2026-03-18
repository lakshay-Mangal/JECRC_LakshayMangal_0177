import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusColorDirective } from './status';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StatusColorDirective],
  templateUrl: './app.html'
})
export class App {
  students = [
    { name: "Arjun", marks: 92 },
    { name: "Bhatra", marks: 45 },
    { name: "Chetan", marks: 62 },
    { name: "Dinesh", marks: 33 },
    { name: "Farukh", marks: 50 } 
  ];
}