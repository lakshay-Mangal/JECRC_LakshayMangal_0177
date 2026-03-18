import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective {
  @Input() appTheme: string = 'light';

  @HostBinding('style.backgroundColor') get bgColor() {
    return this.appTheme === 'dark' ? '#222222' : '#ffffff';
  }

  @HostBinding('style.color') get textColor() {
    return this.appTheme === 'dark' ? '#ffffff' : '#333333';
  }

}