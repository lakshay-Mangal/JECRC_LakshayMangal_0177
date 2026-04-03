import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { EmployeeProvider } from './context/EmployeeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeProfile from './pages/EmployeeProfile';

function App() {
  return (
    // We wrap the entire app in our Context Providers. 
    // This allows any component inside the app to access Auth and Employee data.
    <AuthProvider>
      <EmployeeProvider>
        
        {/* Router handles the changing of URLs without reloading the whole page */}
        <Router>
          <Routes>
            {/* If someone goes to the base URL "/", instantly send them to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            <Route path="/login" element={<Login />} />
            
            {/* ADMIN ROUTE: Wrapped in ProtectedRoute. Only 'admin' role can enter. */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* EMPLOYEE ROUTE: Wrapped in ProtectedRoute. Only 'employee' role can enter. */}
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeProfile />
              </ProtectedRoute>
            } />

            {/* CATCH ALL: If they type a URL that doesn't exist (e.g., /asdfg), send them to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
        
      </EmployeeProvider>
    </AuthProvider>
  );
}

export default App;