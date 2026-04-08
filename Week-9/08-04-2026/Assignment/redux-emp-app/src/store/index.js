import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import activityReducer, { addLog } from './slices/activitySlice';

const loadState = () => {
  try {
    const s = localStorage.getItem('reduxState');
    return s ? JSON.parse(s) : undefined;
  } catch { return undefined; }
};

const saveState = (state) => {
  try {
    localStorage.setItem('reduxState', JSON.stringify({
      employees: state.employees,
      auth: state.auth,
    }));
  } catch (e) { console.error('Persist failed', e); }
};

const loggerMiddleware = (store) => (next) => (action) => {
  if (action.type === 'activity/addLog') return next(action);
  const prevState = store.getState();
  const t0 = performance.now();
  const result = next(action);
  const duration = (performance.now() - t0).toFixed(2);
  console.group(`%c ▶ ${action.type}`, 'color:#4f9cf9;font-weight:bold;');
  console.log('%c prev state', 'color:#9E9E9E', prevState);
  console.log('%c action    ', 'color:#03A9F4', action);
  console.log('%c next state', 'color:#4CAF50', store.getState());
  console.log('%c duration  ', 'color:#FF9800', `${duration}ms`);
  console.groupEnd();
  const skip = ['ui/setActiveTab', 'employees/setSearchQuery', 'ui/removeToast', 'ui/showToast'];
  if (!skip.includes(action.type)) {
    store.dispatch(addLog({ type: action.type, payload: action.payload, duration }));
  }
  return result;
};

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    auth: authReducer,
    ui: uiReducer,
    activity: activityReducer,
  },
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

store.subscribe(() => saveState(store.getState()));
export default store;
