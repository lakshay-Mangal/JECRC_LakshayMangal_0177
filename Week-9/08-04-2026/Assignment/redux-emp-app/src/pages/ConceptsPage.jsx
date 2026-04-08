import { useState } from 'react';

const SECTIONS = [
  {
    id: 'store',
    title: 'Store — Single Source of Truth',
    icon: '🏛️',
    color: 'blue',
    description: 'The Redux store holds the complete state tree of your application. There is only ONE store in a Redux app. It acts as the single source of truth — any component can read from it via useSelector.',
    code: `// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    auth: authReducer,
  },
});

// Wrap your app:
// <Provider store={store}><App /></Provider>`
  },
  {
    id: 'actions',
    title: 'Actions — Describing What Happened',
    icon: '⚡',
    color: 'amber',
    description: 'Actions are plain JavaScript objects with a "type" field describing what occurred. With Redux Toolkit\'s createSlice, action creators are auto-generated. You dispatch actions to trigger state changes.',
    code: `// Auto-generated action creators from createSlice:
import { addEmployee, deleteEmployee, updateEmployee } from './employeeSlice';

// Dispatching actions from a component:
const dispatch = useAppDispatch();

dispatch(addEmployee({ name: 'Priya', role: 'Engineer', ... }));
dispatch(deleteEmployee(3));
dispatch(updateEmployee({ id: 1, salary: 105000 }));

// An action is just a plain object:
// { type: 'employees/addEmployee', payload: { name: 'Priya', ... } }`
  },
  {
    id: 'reducers',
    title: 'Reducers — Pure State Updaters',
    icon: '⚙️',
    color: 'green',
    description: 'Reducers are pure functions: (state, action) => newState. They describe HOW state changes in response to actions. Redux Toolkit uses Immer, letting you write "mutating" code that is actually immutable.',
    code: `// src/store/slices/employeeSlice.js
const employeeSlice = createSlice({
  name: 'employees',
  initialState: { list: [], nextId: 1 },
  reducers: {
    // Immer lets us "mutate" — it produces a new immutable state
    addEmployee: (state, action) => {
      state.list.push({ ...action.payload, id: state.nextId++ });
    },
    deleteEmployee: (state, action) => {
      state.list = state.list.filter(e => e.id !== action.payload);
    },
    updateEmployee: (state, action) => {
      const idx = state.list.findIndex(e => e.id === action.payload.id);
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload };
    },
  },
});`
  },
  {
    id: 'flow',
    title: 'Redux Data Flow Cycle',
    icon: '🔄',
    color: 'purple',
    description: 'Redux follows a strict unidirectional data flow. This predictability is what makes Redux powerful for debugging large applications.',
    code: `// Step 1: Component dispatches an action
dispatch(deleteEmployee(5));

// Step 2: Action goes to the reducer
// employees/deleteEmployee → { type: 'employees/deleteEmployee', payload: 5 }

// Step 3: Reducer computes new state (immutably)
// state.list = state.list.filter(e => e.id !== 5)

// Step 4: Store is updated with the new state

// Step 5: useSelector triggers re-render
const employees = useSelector(selectFilteredEmployees);
// Component re-renders with updated list ✅`
  },
  {
    id: 'selectors',
    title: 'Selectors — Reading State Efficiently',
    icon: '🎯',
    color: 'coral',
    description: 'Selectors are functions that extract and derive data from the store. They keep components decoupled from state shape, and can be memoized with reselect for performance.',
    code: `// Simple selectors
export const selectAllEmployees = (state) => state.employees.list;

// Derived / computed selector
export const selectFilteredEmployees = (state) => {
  const { list, filter, searchQuery } = state.employees;
  return list
    .filter(e => filter === 'all' ? true : e.status === filter)
    .filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
};

// Stats selector
export const selectEmployeeStats = (state) => ({
  total: state.employees.list.length,
  active: state.employees.list.filter(e => e.status === 'active').length,
});

// Usage in component:
const employees = useAppSelector(selectFilteredEmployees);`
  },
  {
    id: 'middleware',
    title: 'Middleware — Extending Redux',
    icon: '🔌',
    color: 'teal',
    description: 'Middleware sits between dispatching an action and the reducer processing it. Used for logging, async operations, crash reporting, and more.',
    code: `// Custom logger middleware (used in this app)
const loggerMiddleware = (store) => (next) => (action) => {
  console.group(\`ACTION: \${action.type}\`);
  console.log('Prev State:', store.getState());
  console.log('Action:', action);
  const result = next(action); // pass to reducer
  console.log('Next State:', store.getState());
  console.groupEnd();
  return result;
};

// Register middleware in store:
export const store = configureStore({
  reducer: { ... },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});`
  },
  {
    id: 'persist',
    title: 'State Persistence — localStorage',
    icon: '💾',
    color: 'red',
    description: 'Redux state is in-memory and resets on refresh. To persist state across sessions, subscribe to the store and save to localStorage. On startup, rehydrate via preloadedState.',
    code: `// Load from localStorage
const loadState = () => {
  try {
    const serialized = localStorage.getItem('reduxState');
    return serialized ? JSON.parse(serialized) : undefined;
  } catch { return undefined; }
};

// Save to localStorage on every change
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify({
    employees: store.getState().employees,
    auth: store.getState().auth,
  }));
});

// Pass to store as initial state:
configureStore({ preloadedState: loadState(), ... })`
  },
];

export default function ConceptsPage() {
  const [active, setActive] = useState('store');
  const section = SECTIONS.find(s => s.id === active);

  return (
    <div className="concepts-page">
      <h2 className="section-title">Redux Concepts Explorer</h2>
      <p className="concepts-subtitle">Click a concept to see its explanation and live code from this app.</p>

      <div className="concepts-layout">
        <div className="concepts-sidebar">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              className={`concept-nav-btn ${active === s.id ? 'active' : ''} concept-nav-${s.color}`}
              onClick={() => setActive(s.id)}
            >
              <span>{s.icon}</span>
              <span>{s.title.split('—')[0].trim()}</span>
            </button>
          ))}
        </div>

        <div className={`concept-detail concept-detail-${section.color}`}>
          <div className="concept-detail-header">
            <span className="concept-big-icon">{section.icon}</span>
            <h3>{section.title}</h3>
          </div>
          <p className="concept-desc">{section.description}</p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-dot red" /><span className="code-dot amber" /><span className="code-dot green" />
              <span className="code-filename">live code from this app</span>
            </div>
            <pre><code>{section.code}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}
