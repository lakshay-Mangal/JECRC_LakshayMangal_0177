import { useState } from "react";
import EmployeeAdd from "./features/employees/employeeAdd";
import EmployeeList from "./features/employees/employeeList";
import EmployeeEdit from "./features/employees/employeeEdit";

function App(){
  const [selectedEmployee, setSelectedEmployee]=useState(null);

  return (
    <div>
      <h1> Employee Management</h1>
      <EmployeeAdd/>
      <EmployeeList onEdit={(employee)=> setSelectedEmployee(employee)} />
      {selectedEmployee && (
        <EmployeeEdit 
        selectedEmployee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  )
}
export default App;