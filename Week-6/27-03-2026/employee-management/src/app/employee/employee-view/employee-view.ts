// src/app/employee/employee-view/employee-view.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee';

@Component({
  selector: 'app-employee-view',
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-view.html',
  styleUrl: './employee-view.css'
})
export class EmployeeView implements OnInit {
  employee: any = null;

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employee = this.service.getEmployee(id);
    if (!this.employee) this.router.navigate(['/employees']);
  }
}