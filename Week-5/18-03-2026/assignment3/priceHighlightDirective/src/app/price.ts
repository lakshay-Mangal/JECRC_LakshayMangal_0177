import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appPriceHighlight]',
  standalone: true
})
export class PriceDirective { 
  
  @Input() set appPriceHighlight(price: number) {
    const highlightColor = price > 50000 ? 'red' : 'green';
    this.el.nativeElement.style.color = highlightColor;
    this.el.nativeElement.style.fontWeight = 'bold';
  }

  constructor(private el: ElementRef) {}
}