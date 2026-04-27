import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav style={{ 
        backgroundColor: 'var(--nav-bg)', 
        padding: '1rem 2rem', 
        borderBottom: '1px solid var(--border-color)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>Portal</h2>
          <Link to="/" style={{ color: 'var(--text-color)', textDecoration: 'none', fontWeight: '500' }}>Directory</Link>
          <Link to="/analytics" style={{ color: 'var(--text-color)', textDecoration: 'none', fontWeight: '500' }}>Analytics</Link>
          <Link to="/settings" style={{ color: 'var(--text-color)', textDecoration: 'none', fontWeight: '500' }}>Settings</Link>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span>Welcome, {user.name}</span>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
      </nav>
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Outlet />
      </main>
    </div>
  );
}