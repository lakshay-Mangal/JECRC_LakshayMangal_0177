import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // useCallback ensures the function reference remains stable
  const login = useCallback((username, password) => {
    // Mock authentication
    if (username === 'admin' && password === 'password') {
      setUser({ id: 1, name: 'Admin User', role: 'HR' });
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