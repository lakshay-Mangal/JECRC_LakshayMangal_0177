
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../core/services/employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-add',
  imports: [FormsModule,RouterModule],
  templateUrl: './employee-add.html',
  styleUrl: './employee-add.css'
})
export class EmployeeAdd {
  name = '';
  role = '';
  errorMsg = '';

  constructor(private service: EmployeeService, private router: Router) {}

  submit() {
    if (!this.name.trim() || !this.role.trim()) {
      this.errorMsg = 'Both fields are required.';
      return;
    }
    this.service.addEmployee({ name: this.name.trim(), role: this.role.trim() });
    this.router.navigate(['/employees']);
  }
}