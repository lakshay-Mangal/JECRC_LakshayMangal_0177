import { Component, signal, Input, OnChanges,OnInit,DoCheck,AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderChild } from "./order-child/order-child";
import { OrderParent } from "./order-parent/order-parent";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OrderChild, OrderParent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lifecycle-hook-demo');
}
