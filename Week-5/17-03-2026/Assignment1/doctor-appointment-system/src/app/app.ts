import { Component, signal } from '@angular/core';
import { AppointmentSystem } from './appointment-system/appointment-system';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppointmentSystem],
  template: `<app-appointment-system></app-appointment-system>`,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('doctor-appointment-system');
}