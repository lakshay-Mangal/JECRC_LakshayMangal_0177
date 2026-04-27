import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

const EmployeeContext = createContext();

const initialEmployees = [
  { id: 1, name: 'Alice Smith', department: 'Engineering' },
  { id: 2, name: 'Bob Jones', department: 'Marketing' },
];

export function EmployeeProvider({ children }) {
  // 1. Initialize state from localStorage if it exists, otherwise use initial data
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : initialEmployees;
  });

  // 2. Automatically save to localStorage whenever the employees array changes
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = useCallback((employee) => {
    setEmployees((prev) => {
      // 3. Generate a sequential ID instead of Date.now()
      const nextId = prev.length > 0 ? Math.max(...prev.map(emp => emp.id)) + 1 : 1;
      return [...prev, { ...employee, id: nextId }];
    });
  }, []);

  const updateEmployee = useCallback((id, updatedData) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp))
    );
  }, []);

  const deleteEmployee = useCallback((id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  }, []);

  const value = useMemo(() => ({
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  }), [employees, addEmployee, updateEmployee, deleteEmployee]);

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}

export const useEmployees = () => useContext(EmployeeContext);