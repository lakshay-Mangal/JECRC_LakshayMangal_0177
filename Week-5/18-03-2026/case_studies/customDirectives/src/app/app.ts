import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HighlightDirective } from './highlight';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HighlightDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('customDirectives');
}
