import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logs: [],
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    addLog: (state, action) => {
      state.logs.unshift({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
      // Keep only last 50 logs
      if (state.logs.length > 50) state.logs = state.logs.slice(0, 50);
    },
    clearLogs: (state) => {
      state.logs = [];
    },
  },
});

export const { addLog, clearLogs } = activitySlice.actions;
export const selectLogs = (state) => state.activity.logs;
export default activitySlice.reducer;
