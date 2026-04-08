import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { login, clearError, selectAuth } from '../store/slices/authSlice';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(selectAuth);
  const [form, setForm] = useState({ username: '', password: '' });
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">⚡</div>
          <h1>EmpManager</h1>
          <p>Redux-Powered Employee Dashboard</p>
        </div>

        <div className="login-hint">
          <span><strong>Admin:</strong> admin / admin123</span>
          <span><strong>HR:</strong> hr / hr123</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={e => { setForm({ ...form, username: e.target.value }); dispatch(clearError()); }}
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={e => { setForm({ ...form, password: e.target.value }); dispatch(clearError()); }}
              required
            />
          </div>
          {error && <div className={`error-msg ${shake ? 'shake' : ''}`}>{error}</div>}
          <button type="submit" className="btn-primary login-btn">Sign In →</button>
        </form>

        <div className="redux-badge">
          <span className="badge">Redux Toolkit</span>
          <span className="badge">React-Redux</span>
          <span className="badge">Persist</span>
        </div>
      </div>
    </div>
  );
}
