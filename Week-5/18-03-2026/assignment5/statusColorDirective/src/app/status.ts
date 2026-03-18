import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true
})
export class StatusColorDirective {
  // 1. Receives the student's marks from the HTML
  @Input() appStatusColor: number = 0; 

  @HostBinding('style.color') get textColor() {
    return this.appStatusColor >= 50 ? 'green' : 'red';
  }

  @HostBinding('style.fontWeight') fontWeight = 'bold';
}