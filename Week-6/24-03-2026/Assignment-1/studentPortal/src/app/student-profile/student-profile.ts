import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-student-profile',
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  student = {
    name: 'Lakshay Mangal',
    email: 'lakshay.mangal@jecrc.com',
    major: 'Computer Science & Artificial Intelligence',
    enrollmentStatus: 'Active'
  };
}
