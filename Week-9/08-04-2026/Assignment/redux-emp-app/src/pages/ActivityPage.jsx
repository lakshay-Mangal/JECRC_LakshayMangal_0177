import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { selectLogs, clearLogs } from '../store/slices/activitySlice';

const ACTION_COLORS = {
  'employees/addEmployee': { bg: 'var(--green-bg)', text: 'var(--green-text)', icon: '➕' },
  'employees/updateEmployee': { bg: 'var(--blue-bg)', text: 'var(--blue-text)', icon: '✏️' },
  'employees/deleteEmployee': { bg: 'var(--red-bg)', text: 'var(--red-text)', icon: '🗑️' },
  'employees/setFilter': { bg: 'var(--purple-bg)', text: 'var(--purple-text)', icon: '🔽' },
  'auth/login': { bg: 'var(--teal-bg)', text: 'var(--teal-text)', icon: '🔑' },
  'auth/logout': { bg: 'var(--amber-bg)', text: 'var(--amber-text)', icon: '🚪' },
  'ui/toggleTheme': { bg: 'var(--amber-bg)', text: 'var(--amber-text)', icon: '🌙' },
};

function getStyle(type) {
  return ACTION_COLORS[type] || { bg: 'var(--bg3)', text: 'var(--text2)', icon: '⚡' };
}

function fmtTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function ActivityPage() {
  const dispatch = useAppDispatch();
  const logs = useAppSelector(selectLogs);

  return (
    <div className="activity-page">
      <div className="activity-header">
        <div>
          <h2 className="section-title" style={{ marginBottom: 4 }}>Activity Log</h2>
          <p className="activity-sub">Every Redux action dispatched in this session is recorded by the logger middleware.</p>
        </div>
        <button className="btn-secondary" onClick={() => dispatch(clearLogs())}>Clear Log</button>
      </div>

      {/* Middleware explanation */}
      <div className="middleware-info">
        <div className="middleware-badge">⚙️ Logger Middleware</div>
        <p>
          The custom <code>loggerMiddleware</code> intercepts every action before it reaches the reducer.
          It records the action type, payload, and execution duration here — and also prints grouped output to the browser console.
        </p>
        <div className="mw-flow">
          <span className="mw-step">Component</span>
          <span className="mw-arrow">dispatch(action) →</span>
          <span className="mw-step active">Logger Middleware</span>
          <span className="mw-arrow">next(action) →</span>
          <span className="mw-step">Reducer</span>
          <span className="mw-arrow">→</span>
          <span className="mw-step">Store Update</span>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
          <div>No actions logged yet. Try adding, editing, or deleting an employee.</div>
        </div>
      ) : (
        <div className="log-list">
          {logs.map((log, i) => {
            const style = getStyle(log.type);
            return (
              <div key={log.id} className="log-entry">
                <div className="log-index">#{logs.length - i}</div>
                <div className="log-icon" style={{ background: style.bg, color: style.text }}>
                  {style.icon}
                </div>
                <div className="log-body">
                  <div className="log-top">
                    <span className="log-type" style={{ background: style.bg, color: style.text }}>
                      {log.type}
                    </span>
                    <span className="log-duration">{log.duration}ms</span>
                    <span className="log-time">{fmtTime(log.timestamp)}</span>
                  </div>
                  {log.payload !== undefined && (
                    <pre className="log-payload">
                      {JSON.stringify(log.payload, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
