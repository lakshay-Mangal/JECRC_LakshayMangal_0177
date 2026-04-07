import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Local state to track what the user types into the input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Bring in the login function and error state from our global context
  const { login, error } = useAuth();
  const navigate = useNavigate();

  // Function triggered when the user clicks 'Login'
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from refreshing the page on form submit
    
    // Basic validation to ensure fields aren't empty
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    
    // Attempt to log in
    const success = login(email, password);
    if (success) {
      // If successful, check their email to decide where to send them
      navigate(email.includes('admin') ? '/admin' : '/profile');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Portal Login</h2>
      
      {/* If there is an error in the global state, show it here */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          {/* We bind the input value to our local state and update state on every keystroke */}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p><em>Hint: admin@portal.com/admin123 OR emp@portal.com/emp123</em></p>
    </div>
  );
};

export default Login;