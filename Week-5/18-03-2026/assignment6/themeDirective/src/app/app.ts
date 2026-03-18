import { Component } from '@angular/core';
import { ThemeDirective } from './theme';
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThemeDirective, UpperCasePipe],
  templateUrl: './app.html'
})
export class App {
  // Start with light mode by default
  currentTheme = 'light'; 

  // Function to flip the theme
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
  }
}