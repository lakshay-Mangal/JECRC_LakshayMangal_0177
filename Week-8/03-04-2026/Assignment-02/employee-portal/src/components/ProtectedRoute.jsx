import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

// This component wraps around our sensitive pages
const ProtectedRoute = ({ children, allowedRoles }) => {
  // Grab the current user from our global auth context
  const { user } = useAuth();

  // If there is no user logged in, immediately kick them to the login screen
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the route has specific allowed roles, check if the user has that role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If they are logged in but have the WRONG role, redirect them to their proper dashboard
    // Admin goes to /admin, Employees go to /profile
    return <Navigate to={user.role === 'admin' ? '/admin' : '/profile'} replace />;
  }

  // If they passed all checks, render the page they requested
  return children;
};

export default ProtectedRoute;