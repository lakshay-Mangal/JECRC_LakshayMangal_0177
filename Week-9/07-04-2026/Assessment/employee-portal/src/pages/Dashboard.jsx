import { useState } from 'react';
import { useEmployees } from '../Context/EmployeeContext';
import { useAuth } from '../Context/AuthContext';

export default function Dashboard() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const { user } = useAuth(); // Grab the logged-in user to check their role
  
  const [formData, setFormData] = useState({ name: '', department: '' });
  const [editingId, setEditingId] = useState(null);

  // --- EMPLOYEE VIEW ---
  if (user.role === 'Employee') {
    // Find this specific employee's details from the global employee list
    const myDetails = employees.find(emp => emp.name === user.name);

    return (
      <div>
        <h2>My Profile</h2>
        <div className="card" style={{ maxWidth: '500px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', 
            background: 'var(--primary-color)', color: 'white', 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            fontSize: '2rem', fontWeight: 'bold' 
          }}>
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 style={{ margin: 0 }}>{user.name}</h3>
            <span style={{ 
              display: 'inline-block', background: 'var(--border-color)', 
              padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', marginTop: '5px' 
            }}>
              {user.role}
            </span>
            <div style={{ marginTop: '15px', color: 'var(--text-muted)' }}>
              <p><strong>Employee ID:</strong> {myDetails?.id || user.id}</p>
              <p><strong>Department:</strong> {myDetails?.department || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- ADMIN VIEW ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.department) return;
    if (editingId) {
      updateEmployee(editingId, formData);
      setEditingId(null);
    } else {
      addEmployee(formData);
    }
    setFormData({ name: '', department: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Employee Directory</h2>
        <span style={{ background: 'var(--primary-color)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>Admin Mode</span>
      </div>

      {/* Admin Form Card */}
      <div className="card">
        <h3>{editingId ? 'Edit Employee' : 'Add New Employee'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Department</label>
            <input type="text" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>
              {editingId ? 'Update' : 'Add Employee'}
            </button>
            {editingId && (
               <button type="button" className="btn btn-outline" style={{ width: 'auto' }} onClick={() => { setEditingId(null); setFormData({name: '', department: ''}); }}>
                 Cancel
               </button>
            )}
          </div>
        </form>
      </div>

      {/* Admin Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td style={{ fontWeight: '500' }}>{emp.name}</td>
              <td>{emp.department}</td>
              <td style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => { setEditingId(emp.id); setFormData({ name: emp.name, department: emp.department }); }}>Edit</button>
                <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}