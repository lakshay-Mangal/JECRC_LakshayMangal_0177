import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RxjsDemo } from './rxjs-demo/rxjs-demo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RxjsDemo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rxjs-demo');
}
