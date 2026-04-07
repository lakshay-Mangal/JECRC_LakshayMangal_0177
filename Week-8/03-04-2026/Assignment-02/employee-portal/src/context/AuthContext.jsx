import { createContext, useState, useContext } from 'react';

// 1. Create the Context object. This acts like a global store for authentication data.
const AuthContext = createContext();

// 2. Create the Provider component. This will wrap our app and provide the state to all children.
export const AuthProvider = ({ children }) => {
  // State to hold the current logged-in user. 'null' means no one is logged in.
  const [user, setUser] = useState(null); 
  // State to hold any error messages from failed login attempts.
  const [error, setError] = useState("");

  // Function to handle logging in
  const login = (email, password) => {
    // In a real app, we can make an API call here. 
    // For now, we hardcode the checks for demonstration.
    if (email === 'admin@portal.com' && password === 'admin123') {
      setUser({ id: 1, name: 'Super Admin', email, role: 'admin' });
      setError(""); // Clear any previous errors
      return true;  // Tell the login page it was successful
    } else if (email === 'emp@portal.com' && password === 'emp123') {
      setUser({ id: 2, name: 'John Doe', email, role: 'employee' });
      setError("");
      return true;
    }
    
    // If the credentials don't match,we cna set an error and return false
    setError("Invalid email or password");
    return false;
  };

  // Funcn to handle logging out. It simply resets the user back to null.
  const logout = () => setUser(null);

  // Expose the user state and the login/logout functions to the rest of the app
  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook. This makes it super easy to use this context in other files.
// Instead of writing `useContext(AuthContext)` everywhere, we just write `useAuth()`.
export const useAuth = () => useContext(AuthContext);