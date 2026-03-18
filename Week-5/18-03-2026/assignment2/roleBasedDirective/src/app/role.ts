import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective {
  @Input() appRole = ''; // The allowed roles (e.g., 'admin' or 'admin,user')

  @Input() set appRoleActive(activeRole: string) {
    this.vc.clear();
    // If the allowed roles string contains the active role, render the HTML
    if (this.appRole.includes(activeRole)) {
      this.vc.createEmbeddedView(this.tpl);
    }
  }

  constructor(private tpl: TemplateRef<any>, private vc: ViewContainerRef) {}
}