import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(credentials.username, credentials.password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials. Try: admin / password OR employee / password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '5px' }}>Nexus Portal</h2>
        <p className="text-muted" style={{ marginBottom: '20px' }}>Sign in to your account</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="admin OR employee"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>

          {error && <p style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginBottom: '15px' }}>{error}</p>}
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}