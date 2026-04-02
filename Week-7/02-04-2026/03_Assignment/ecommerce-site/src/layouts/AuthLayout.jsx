import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="auth-layout">
      <Link to="/" className="auth-back-btn">
        ← Back to Home
      </Link>
      <div className="auth-box">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;