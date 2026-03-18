import { Component } from '@angular/core';
import { RoleDirective } from './role';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RoleDirective], 
  templateUrl: './app.html'
})
export class App {
  currentRole = 'admin'; // Start as admin
}