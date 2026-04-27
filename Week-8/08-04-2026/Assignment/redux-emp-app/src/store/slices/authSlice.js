import { createSlice } from '@reduxjs/toolkit';

const USERS = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User', avatar: 'AU' },
  { id: 2, username: 'hr', password: 'hr123', role: 'hr', name: 'HR Manager', avatar: 'HR' },
];

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const found = USERS.find(u => u.username === username && u.password === password);
      if (found) {
        const { password: _, ...safeUser } = found;
        state.user = safeUser;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = 'Invalid username or password';
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { login, logout, clearError } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
