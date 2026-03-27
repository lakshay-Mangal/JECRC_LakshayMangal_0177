
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../core/services/employee';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList {
  employees: any[] = [];
  searchQuery = '';

  constructor(private service: EmployeeService) {
    this.employees = this.service.getEmployees();
  }

  search() {
    this.employees = this.searchQuery.trim()
      ? this.service.searchEmployees(this.searchQuery)
      : this.service.getEmployees();
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.service.deleteEmployee(id);
      this.employees = this.service.getEmployees();
    }
  }
}