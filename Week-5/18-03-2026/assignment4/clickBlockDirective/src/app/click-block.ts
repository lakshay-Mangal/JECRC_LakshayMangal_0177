import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appClickBlock]',
  standalone: true
})
export class ClickBlockDirective {
  
  @Input() appClickBlock: boolean = false; 

  @HostBinding('style.pointer-events') get pointerEvents() {
    return this.appClickBlock ? 'auto' : 'none';
  }

 
  @HostBinding('style.opacity') get opacity() {
    return this.appClickBlock ? '1' : '0.5';
  }
}