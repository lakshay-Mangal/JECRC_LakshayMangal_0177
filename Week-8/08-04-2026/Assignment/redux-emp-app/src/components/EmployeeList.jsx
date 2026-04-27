import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  selectFilteredEmployees, deleteEmployee, setFilter, setSearchQuery,
  addEmployee, updateEmployee
} from '../store/slices/employeeSlice';
import { showToast } from '../store/slices/uiSlice';

const DEPARTMENTS = ['Engineering', 'Product', 'Analytics', 'Design', 'HR', 'Finance'];
const EMPTY_FORM = { name: '', role: '', department: 'Engineering', email: '', salary: '', status: 'active', joined: '' };

export default function EmployeeList() {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(selectFilteredEmployees);
  const filter = useAppSelector(s => s.employees.filter);
  const searchQuery = useAppSelector(s => s.employees.searchQuery);

  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openAdd = () => { setForm(EMPTY_FORM); setModal('add'); };
  const openEdit = (emp) => {
    setForm({ name: emp.name, role: emp.role, department: emp.department, email: emp.email, salary: emp.salary, status: emp.status, joined: emp.joined });
    setEditId(emp.id);
    setModal('edit');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modal === 'add') {
      dispatch(addEmployee({ ...form, salary: Number(form.salary) }));
      dispatch(showToast({ message: `${form.name} added successfully`, type: 'success' }));
    } else {
      dispatch(updateEmployee({ id: editId, ...form, salary: Number(form.salary) }));
      dispatch(showToast({ message: `${form.name} updated`, type: 'info' }));
    }
    setModal(null);
  };

  const handleDelete = (id, name) => {
    setConfirmDelete({ id, name });
  };

  const confirmDoDelete = () => {
    dispatch(deleteEmployee(confirmDelete.id));
    dispatch(showToast({ message: `${confirmDelete.name} removed`, type: 'error' }));
    setConfirmDelete(null);
  };

  return (
    <div className="employee-section">
      <div className="emp-header">
        <h2 className="section-title">Employees</h2>
        <button className="btn-primary" onClick={openAdd}>+ Add Employee</button>
      </div>

      <div className="emp-controls">
        <input
          className="search-input"
          placeholder="🔍  Search by name, role, department…"
          value={searchQuery}
          onChange={e => dispatch(setSearchQuery(e.target.value))}
        />
        <div className="filter-tabs">
          {['all', 'active', 'inactive'].map(f => (
            <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => dispatch(setFilter(f))}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {employees.length === 0 ? (
        <div className="empty-state">No employees found. Try adjusting filters.</div>
      ) : (
        <div className="emp-table-wrap">
          <table className="emp-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td>
                    <div className="emp-cell">
                      <div className="emp-avatar">{emp.avatar}</div>
                      <div>
                        <div className="emp-name">{emp.name}</div>
                        <div className="emp-email">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{emp.role}</td>
                  <td><span className="dept-badge">{emp.department}</span></td>
                  <td>${emp.salary?.toLocaleString()}</td>
                  <td><span className={`status-badge status-${emp.status}`}>{emp.status}</span></td>
                  <td>{emp.joined}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => openEdit(emp)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(emp.id, emp.name)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal === 'add' ? 'Add New Employee' : 'Edit Employee'}</h3>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="field">
                  <label>Full Name</label>
                  <input required placeholder="e.g. Priya Sharma" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="field">
                  <label>Role</label>
                  <input required placeholder="e.g. Frontend Engineer" value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label>Department</label>
                  <select value={form.department} onChange={e => setForm({...form, department: e.target.value})}>
                    {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Email</label>
                  <input required type="email" placeholder="name@corp.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label>Salary ($)</label>
                  <input required type="number" placeholder="90000" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} />
                </div>
                <div className="field">
                  <label>Date Joined</label>
                  <input required type="date" value={form.joined} onChange={e => setForm({...form, joined: e.target.value})} />
                </div>
              </div>
              <div className="field">
                <label>Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                <button type="submit" className="btn-primary">{modal === 'add' ? 'Add Employee' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="confirm-icon">🗑️</div>
            <h3>Delete Employee?</h3>
            <p>Are you sure you want to remove <strong>{confirmDelete.name}</strong>? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn-danger" onClick={confirmDoDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
