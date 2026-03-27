
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../core/services/employee';

@Component({
  selector: 'app-employee-edit',
  imports: [FormsModule, RouterModule],
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.css'
})
export class EmployeeEdit implements OnInit {
  name = '';
  role = '';
  errorMsg = '';
  private empId!: number;

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.empId = Number(this.route.snapshot.paramMap.get('id'));
    const emp = this.service.getEmployee(this.empId);
    if (emp) {
      this.name = emp.name;
      this.role = emp.role;
    } else {
      this.router.navigate(['/employees']);
    }
  }

  submit() {
    if (!this.name.trim() || !this.role.trim()) {
      this.errorMsg = 'Both fields are required.';
      return;
    }
    this.service.updateEmployee(this.empId, { name: this.name.trim(), role: this.role.trim() });
    this.router.navigate(['/employees']);
  }
}