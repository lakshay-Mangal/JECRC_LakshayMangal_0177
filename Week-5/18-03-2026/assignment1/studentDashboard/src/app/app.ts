import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  students = [
    { name: "Arjun", marks: 92 },
    { name: "Bhatra", marks: 86 },
    { name: "Chetan", marks: 62 },
    { name: "Dinesh", marks: 12 }, // Fixed a tiny typo here
    { name: "Farukh", marks: 22 }
  ];

  getGrade(marks: number): string {
    if (marks >= 90) return 'A';
    else if (marks >= 75) return 'B';
    else if (marks >= 50) return 'C';
    else return 'D';
  }
}