import { useState } from 'react';
import { useEmployees } from '../Context/EmployeeContext';

export default function Dashboard() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  
  // Local state for the form
  const [formData, setFormData] = useState({ name: '', department: '' });
  const [editingId, setEditingId] = useState(null); // Tracks which employee we are editing

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.department) return;
    
    if (editingId) {
      updateEmployee(editingId, formData);
      setEditingId(null); // Exit edit mode
    } else {
      addEmployee(formData);
    }
    setFormData({ name: '', department: '' }); // Reset form
  };

  const handleEditClick = (emp) => {
    setEditingId(emp.id);
    setFormData({ name: emp.name, department: emp.department });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', department: '' });
  };

  return (
    <div>
      <h2>Employee Directory</h2>

      {/* --- ADD/EDIT FORM --- */}
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid gray', borderRadius: '8px' }}>
        <h3>{editingId ? 'Edit Employee' : 'Add New Employee'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Employee Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ padding: '8px' }}
          />
          <input
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer', background: editingId ? '#1890ff' : '#52c41a', color: 'white', border: 'none', borderRadius: '4px' }}>
            {editingId ? 'Update Employee' : 'Add Employee'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} style={{ padding: '8px 16px', cursor: 'pointer' }}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* --- EMPLOYEE LIST (TABLE) --- */}
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid gray' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Department</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr><td colSpan="4" style={{ padding: '10px', textAlign: 'center' }}>No employees found.</td></tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '10px' }}>{emp.id}</td>
                <td style={{ padding: '10px' }}>{emp.name}</td>
                <td style={{ padding: '10px' }}>{emp.department}</td>
                <td style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleEditClick(emp)} style={{ cursor: 'pointer', padding: '5px 10px' }}>
                    Edit
                  </button>
                  <button onClick={() => deleteEmployee(emp.id)} style={{ background: '#ff4d4f', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}