import { createContext, useState, useContext, useEffect } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  // 1. When the app loads, check if we have saved employees in localStorage
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('portal_employees');
    if (savedEmployees) {
      return JSON.parse(savedEmployees);
    }
    // If nothing is saved, use these defaults
    return [
      { id: 2, name: 'John Doe', email: 'emp@portal.com', position: 'Developer' },
      { id: 3, name: 'Jane Smith', email: 'jane@portal.com', position: 'Designer' }
    ];
  });

  // 2. Whenever the 'employees' state changes, save the new list to localStorage
  useEffect(() => {
    localStorage.setItem('portal_employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (emp) => {
    setEmployees([...employees, { ...emp, id: Date.now() }]);
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);