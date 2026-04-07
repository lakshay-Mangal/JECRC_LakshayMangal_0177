import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useTheme } from '../Context/ThemeContext';

export default function Settings() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Account Settings</h2>

      <div className="card">
        <h3>Profile Information</h3>
        <hr style={{ margin: '10px 0', borderColor: 'var(--border-color)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '10px', marginTop: '15px' }}>
          <strong>Name:</strong> <span>{user.name}</span>
          <strong>User ID:</strong> <span>{user.id}</span>
          <strong>Role:</strong> <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{user.role}</span>
        </div>
      </div>

      <div className="card">
        <h3>Preferences</h3>
        <hr style={{ margin: '10px 0', borderColor: 'var(--border-color)' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
          <div>
            <strong>Appearance</strong>
            <p style={{ fontSize: '0.9rem', color: 'gray' }}>Toggle between Light and Dark mode</p>
          </div>
          <button className="btn btn-outline" onClick={toggleTheme}>
            {theme === 'light' ? 'Switch to Dark Mode 🌙' : 'Switch to Light Mode ☀️'}
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <div>
            <strong>Email Notifications</strong>
            <p style={{ fontSize: '0.9rem', color: 'gray' }}>Receive weekly reports and system alerts</p>
          </div>
          <button 
            className={notifications ? "btn btn-primary" : "btn btn-outline"} 
            onClick={() => setNotifications(!notifications)}
          >
            {notifications ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>
    </div>
  );
}