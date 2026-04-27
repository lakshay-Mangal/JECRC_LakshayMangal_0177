import { useAuth } from '../context/authContext';
import { useEmployees } from '../context/EmployeeContext';

const EmployeeProfile = () => {
  const { user, logout } = useAuth();
  const { employees } = useEmployees();

  // Look through all the employee data and find the exact object that matches the logged-in user's email.
  // This ensures they can only see their own data, not everyone's.
  const myData = employees.find(emp => emp.email === user.email);

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>My Profile</h2>
        <button onClick={logout}>Logout</button>
      </header>
      <hr />
      
      {/* If we find their data, we display it. Otherwise,we show an error message. */}
      {myData ? (
        <div>
          <p><strong>Name:</strong> {myData.name}</p>
          <p><strong>Email:</strong> {myData.email}</p>
          <p><strong>Position:</strong> {myData.position}</p>
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};

export default EmployeeProfile;