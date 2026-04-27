import { useAppDispatch, useAppSelector } from './hooks/redux';
import { selectIsAuthenticated, selectCurrentUser, logout } from './store/slices/authSlice';
import { selectActiveTab, setActiveTab, toggleTheme, selectTheme } from './store/slices/uiSlice';
import LoginPage from './pages/LoginPage';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import ConceptsPage from './pages/ConceptsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ActivityPage from './pages/ActivityPage';
import StateInspectorPage from './pages/StateInspectorPage';
import SettingsPage from './pages/SettingsPage';
import ToastContainer from './components/ToastContainer';
import LoadingSpinner from './components/LoadingSpinner';
import { useEffect } from 'react';
import { selectLogs } from './store/slices/activitySlice';

export default function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const activeTab = useAppSelector(selectActiveTab);
  const theme = useAppSelector(selectTheme);
  const logs = useAppSelector(selectLogs);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (!isAuthenticated) return <LoginPage />;

  const tabs = [
    { id: 'dashboard',  label: '📊', title: 'Dashboard' },
    { id: 'employees',  label: '👥', title: 'Employees' },
    { id: 'analytics',  label: '📈', title: 'Analytics' },
    { id: 'concepts',   label: '📚', title: 'Concepts' },
    { id: 'activity',   label: '⚡', title: 'Activity', badge: logs.length || null },
    { id: 'inspector',  label: '🔍', title: 'State' },
    { id: 'settings',   label: '⚙️', title: 'Settings' },
  ];

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-name">EmpManager</span>
          <span className="brand-tag">Redux Toolkit</span>
        </div>

        <nav className="header-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-btn ${activeTab === tab.id ? 'nav-active' : ''}`}
              onClick={() => dispatch(setActiveTab(tab.id))}
            >
              <span>{tab.label}</span>
              <span className="nav-btn-label">{tab.title}</span>
              {tab.badge ? <span className="nav-badge">{tab.badge}</span> : null}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-btn" title="Toggle theme" onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <div className="user-info">
            <div className="user-avatar">{user?.avatar}</div>
            <span className="user-name">{user?.name}</span>
            <span className={`role-tag role-${user?.role}`}>{user?.role}</span>
          </div>
          <button className="btn-logout" onClick={() => dispatch(logout())}>Logout</button>
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'employees' && <EmployeeList />}
        {activeTab === 'analytics'  && <AnalyticsPage />}
        {activeTab === 'concepts'   && <ConceptsPage />}
        {activeTab === 'activity'   && <ActivityPage />}
        {activeTab === 'inspector'  && <StateInspectorPage />}
        {activeTab === 'settings'   && <SettingsPage />}
      </main>

      <ToastContainer />
      <LoadingSpinner />
    </div>
  );
}
