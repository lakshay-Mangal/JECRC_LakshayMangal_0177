import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import { AuthProvider, useAuth } from './Context/AuthContext';
import { EmployeeProvider } from './Context/EmployeeContext';
import  Analytics  from './pages/Analytics';
import Settings from './pages/Settings'; 
// Import our pages (we will create these next)
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

// A wrapper to protect routes
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EmployeeProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                {/*we can Add Analytics, Settings, etc. here */}
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </Router>
        </EmployeeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;