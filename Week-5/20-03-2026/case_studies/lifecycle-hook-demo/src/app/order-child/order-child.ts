import {
  Component,
  Input,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-child.html',
  styleUrls: ['./order-child.css']
})
export class OrderChild implements
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  @Input() orderData: any;

   logs: string[] = [];

  log(message: string) {
    this.logs.push(`${new Date().toLocaleTimeString()} - ${message}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
  this.log(' ngOnChanges - Input Data changed');
  }

  ngOnInit(): void {
  this.log(' ngOnInit - Component initialized');
  }

  ngDoCheck(): void {
  this.log(' ngDoCheck - Change detection run');
  }

  ngAfterContentInit(): void {
  this.log(' ngAfterContentInit - Content initialized');
  }

  ngAfterContentChecked(): void {
  this.log(' ngAfterContentChecked - Content checked');
  }

  ngAfterViewInit(): void {
  this.log(' ngAfterViewInit - View initialized');
 }

  ngAfterViewChecked(): void {
  this.log(' ngAfterViewChecked - View checked');
  }

ngOnDestroy(): void {
  this.log(' ngOnDestroy - Component destroyed');
  }
}