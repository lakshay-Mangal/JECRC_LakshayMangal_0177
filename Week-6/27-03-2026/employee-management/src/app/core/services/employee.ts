import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees = [
    { id: 1, name: 'John ', role: 'Software Engineer' },
    { id: 2, name: 'Jane ', role: 'Project Manager' },
    
  ];
  getEmployees() {
    return this.employees;
  }

  getEmployee(id: number) {
    return this.employees.find(e => e.id === id);
  }
  addEmployee(employee: { name: string; role: string }) {
    const newEmployee = { id: Date.now(), ...employee };
    this.employees.push(newEmployee);
  }
  updateEmployee(id: number, updatedInfo: { name?: string; role?: string }) {
    const employee = this.getEmployee(id);
    if (employee) {
      Object.assign(employee, updatedInfo);
    }
  }
 
  deleteEmployee(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
  } 
  searchEmployees(query: string) {
    return this.employees.filter(e => e.name.toLowerCase().includes(query.toLowerCase())
      || e.role.toLowerCase().includes(query.toLowerCase()));
    
  }

}
