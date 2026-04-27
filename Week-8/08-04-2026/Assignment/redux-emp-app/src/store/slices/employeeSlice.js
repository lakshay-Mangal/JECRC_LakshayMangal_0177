import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    { id: 1, name: 'Priya Sharma', role: 'Frontend Engineer', department: 'Engineering', email: 'priya@corp.com', salary: 95000, status: 'active', joined: '2022-03-15', avatar: 'PS' },
    { id: 2, name: 'Rahul Mehta', role: 'Product Manager', department: 'Product', email: 'rahul@corp.com', salary: 115000, status: 'active', joined: '2021-07-01', avatar: 'RM' },
    { id: 3, name: 'Ananya Iyer', role: 'Data Scientist', department: 'Analytics', email: 'ananya@corp.com', salary: 105000, status: 'active', joined: '2023-01-10', avatar: 'AI' },
    { id: 4, name: 'Vikram Nair', role: 'DevOps Engineer', department: 'Engineering', email: 'vikram@corp.com', salary: 98000, status: 'inactive', joined: '2020-11-20', avatar: 'VN' },
    { id: 5, name: 'Sneha Patel', role: 'UX Designer', department: 'Design', email: 'sneha@corp.com', salary: 88000, status: 'active', joined: '2022-08-05', avatar: 'SP' },
  ],
  filter: 'all',
  searchQuery: '',
  nextId: 6,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      // Immutable update via Immer (built into RTK)
      state.list.push({ ...action.payload, id: state.nextId++, avatar: action.payload.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) });
    },
    updateEmployee: (state, action) => {
      const index = state.list.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
    deleteEmployee: (state, action) => {
      state.list = state.list.filter(e => e.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee, setFilter, setSearchQuery } = employeeSlice.actions;

// Selectors
export const selectAllEmployees = (state) => state.employees.list;
export const selectFilteredEmployees = (state) => {
  const { list, filter, searchQuery } = state.employees;
  return list
    .filter(e => filter === 'all' ? true : e.status === filter)
    .filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 e.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 e.department.toLowerCase().includes(searchQuery.toLowerCase()));
};
export const selectEmployeeStats = (state) => {
  const list = state.employees.list;
  return {
    total: list.length,
    active: list.filter(e => e.status === 'active').length,
    inactive: list.filter(e => e.status === 'inactive').length,
    departments: [...new Set(list.map(e => e.department))].length,
  };
};

export default employeeSlice.reducer;
