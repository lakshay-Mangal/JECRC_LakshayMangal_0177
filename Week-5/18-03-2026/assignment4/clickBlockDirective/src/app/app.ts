import { Component } from '@angular/core';
import { ClickBlockDirective } from './click-block'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClickBlockDirective],
  templateUrl: './app.html'
})
export class App {
  isAllowed = false; 

  executeSecureAction() {
    alert('Success! The secure action was executed.');
  }
}