import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GreetingComponent } from './greeting/greeting';
import { Home } from './home/home';
import { Product } from './product/product';
import { User } from './user/user';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,GreetingComponent, Home,Product,User],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('myAngularApp');
}
