import { useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import { useAuth } from '../context/authContext';

const AdminDashboard = () => {
  // Grab our CRUD functions from the Employee Context
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  // Grab logout and user info from the Auth Context
  const { logout, user } = useAuth();
  
  // A single state object to hold all form inputs, cleaner than 3 separate useStates
  const [formData, setFormData] = useState({ name: '', email: '', position: '' });
  
  // Tracks if we are editing an existing employee. Null means we are adding a new one.
  const [editId, setEditId] = useState(null);

  // Handles both Adding and Updating
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return alert("Name and Email are required");

    if (editId) {
      // If editId exists, we are in UPDATE mode
      updateEmployee(editId, formData);
      setEditId(null); // Exit edit mode
      alert("Employee Updated!");
    } else {
      // If editId is null, we are in ADD mode
      addEmployee(formData);
      alert("Employee Added!");
    }
    
    // Clear the form fields after submission
    setFormData({ name: '', email: '', position: '' });
  };

  // Triggers when the 'Edit' button is clicked on a table row
  const handleEdit = (emp) => {
    setEditId(emp.id); // Set the ID so the system knows we are editing
    // Populate the form with the selected employee's data
    setFormData({ name: emp.name, email: emp.email, position: emp.position }); 
  };

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Admin Dashboard - Welcome {user.name}</h2>
        <button onClick={logout}>Logout</button>
      </header>
      
      <hr />

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        {/* The title changes dynamically based on whether editId is set */}
        <h3>{editId ? 'Edit Employee' : 'Add New Employee'}</h3>
        
        {/* The inputs update the formData object. We use the spread operator (...) to keep existing data and only update the specific field */}
        <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="text" placeholder="Position" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} />
        
        {/* Button text changes dynamically */}
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
        
        {/* If we are editing, show a Cancel button to abort and clear the form */}
        {editId && <button type="button" onClick={() => { setEditId(null); setFormData({name:'', email:'', position:''})}}>Cancel</button>}
      </form>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Position</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through the global employee list and create a table row for each */}
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => deleteEmployee(emp.id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;