import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-system',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment-system.html',
  styleUrl: './appointment-system.css',
})
export class AppointmentSystem {

  patientName = '';
  doctorName = '';
  date = '';
  consultationType = '';
  symptoms = '';

  fee = 0;
  submitted = false;

  today = new Date().toISOString().split('T')[0];

  updateFee() {
    this.fee = this.consultationType === 'Online' ? 300 : 500;
  }

  submitForm() {
    this.submitted = true;
  }

}