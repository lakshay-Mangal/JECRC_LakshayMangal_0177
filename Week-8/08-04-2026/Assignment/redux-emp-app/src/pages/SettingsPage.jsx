import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleTheme, selectTheme } from '../store/slices/uiSlice';
import { clearLogs } from '../store/slices/activitySlice';
import { showToast } from '../store/slices/uiSlice';

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const clearStorage = () => {
    localStorage.removeItem('reduxState');
    dispatch(showToast({ message: 'localStorage cleared. Refresh to reset state.', type: 'info' }));
  };

  return (
    <div className="settings-page">
      <h2 className="section-title">Settings</h2>

      <div className="settings-sections">
        {/* Appearance */}
        <div className="settings-card">
          <h3>Appearance</h3>
          <div className="settings-row">
            <div className="settings-label">
              <div className="settings-label-title">Theme</div>
              <div className="settings-label-sub">Toggle between light and dark mode</div>
            </div>
            <button className="theme-toggle-btn" onClick={() => dispatch(toggleTheme())}>
              <span>{theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
            </button>
          </div>
        </div>

        {/* Data */}
        <div className="settings-card">
          <h3>Data & Storage</h3>
          <div className="settings-row">
            <div className="settings-label">
              <div className="settings-label-title">Persist State</div>
              <div className="settings-label-sub">Employee and auth data is saved to localStorage automatically</div>
            </div>
            <span className="settings-tag green">Enabled</span>
          </div>
          <div className="settings-row">
            <div className="settings-label">
              <div className="settings-label-title">Clear Activity Log</div>
              <div className="settings-label-sub">Remove all logged Redux actions from memory</div>
            </div>
            <button className="btn-secondary" onClick={() => dispatch(clearLogs())}>Clear</button>
          </div>
          <div className="settings-row">
            <div className="settings-label">
              <div className="settings-label-title">Reset localStorage</div>
              <div className="settings-label-sub">Removes persisted state — refresh to go back to defaults</div>
            </div>
            <button className="btn-danger" onClick={clearStorage}>Reset</button>
          </div>
        </div>

        {/* About */}
        <div className="settings-card">
          <h3>About This App</h3>
          <div className="about-grid">
            {[
              ['Framework', 'React 19 + Vite'],
              ['State Management', 'Redux Toolkit'],
              ['React Binding', 'React-Redux'],
              ['Slices', 'employees, auth, ui, activity'],
              ['Middleware', 'Custom Logger (records all actions)'],
              ['Persistence', 'localStorage (subscribe pattern)'],
              ['Immutability', 'Immer (built into RTK)'],
              ['Credentials', 'admin/admin123 · hr/hr123'],
            ].map(([k, v]) => (
              <div key={k} className="about-row">
                <span className="about-key">{k}</span>
                <span className="about-val">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Redux flow reminder */}
        <div className="settings-card flow-card">
          <h3>Redux Data Flow</h3>
          <div className="flow-diagram">
            {['Component\ndispatch(action)', 'Middleware\n(logger)', 'Reducer\n(pure fn)', 'Store\n(new state)', 'UI\nuseSelector'].map((step, i, arr) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className={`flow-box ${i === 1 ? 'flow-box-amber' : i === 2 ? 'flow-box-green' : 'flow-box-blue'}`}>
                  {step.split('\n').map((line, j) => (
                    <span key={j} className={j === 0 ? 'flow-box-title' : 'flow-box-sub'}>{line}</span>
                  ))}
                </div>
                {i < arr.length - 1 && <span className="flow-arrow">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
