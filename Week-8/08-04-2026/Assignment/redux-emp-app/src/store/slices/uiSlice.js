import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  loading: false,
  toasts: [],
  activeTab: 'dashboard',
  toastId: 0,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    showToast: (state, action) => {
      state.toasts.push({ id: ++state.toastId, ...action.payload });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(t => t.id !== action.payload);
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { toggleTheme, setLoading, showToast, removeToast, setActiveTab } = uiSlice.actions;

export const selectTheme = (state) => state.ui.theme;
export const selectLoading = (state) => state.ui.loading;
export const selectToasts = (state) => state.ui.toasts;
export const selectActiveTab = (state) => state.ui.activeTab;

export default uiSlice.reducer;
