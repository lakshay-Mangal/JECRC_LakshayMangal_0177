import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize from localStorage to keep user logged in on refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('authUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [user]);

  const login = useCallback((username, password) => {
    // Mock Authentication Logic
    if (password !== 'password') return false;

    if (username === 'admin') {
      setUser({ id: 99, name: 'Admin User', role: 'Admin' });
      return true;
    } else if (username === 'employee') {
      // Note: We match this name to one of the initial employees in your EmployeeContext!
      setUser({ id: 1, name: 'Alice Smith', role: 'Employee' }); 
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);