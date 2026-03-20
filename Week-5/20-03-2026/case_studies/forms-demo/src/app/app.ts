import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FeedbackForm } from './feedback-form/feedback-form';
import { Employee } from './employee/employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, FeedbackForm, Employee],
  template: `
    <!-- <h1 style="text-align:center;">Angular 21 Template-driven Demo</h1>


      <div style="flex:1; min-width:300px; border:1px solid #ccc; padding:10px;">
        <h2>Employee Feedback</h2>
           <h1 style="text-align:center;">Angular 21 Template-driven Demo</h1>

        <app-feedback-form></app-feedback-form>
      </div> -->
      <div style="flex:1; min-width:300px; border:1px solid #ccc; padding:10px;">
        <h2>Employee Form</h2>
        <app-employee> </app-employee>
      </div>
      `,
  styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('form_demo');

}
