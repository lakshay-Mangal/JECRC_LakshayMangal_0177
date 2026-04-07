import { useMemo } from 'react';
import { useEmployees } from '../Context/EmployeeContext';

export default function Analytics() {
  const { employees } = useEmployees();

  // useMemo ensures we only recalculate stats when the employee list actually changes
  const departmentStats = useMemo(() => {
    const stats = {};
    employees.forEach((emp) => {
      stats[emp.department] = (stats[emp.department] || 0) + 1;
    });
    return stats;
  }, [employees]);

  const totalEmployees = employees.length;
  const maxInDept = Math.max(...Object.values(departmentStats), 1); // Avoid division by zero

  return (
    <div>
      <h2>Portal Analytics</h2>
      
      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '2rem' }}>
        <div style={{ padding: '20px', border: '1px solid gray', borderRadius: '8px', minWidth: '150px' }}>
          <h3>Total Headcount</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>{totalEmployees}</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid gray', borderRadius: '8px', minWidth: '150px' }}>
          <h3>Departments</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>{Object.keys(departmentStats).length}</p>
        </div>
      </div>

      {/* Native CSS Bar Chart */}
      <div style={{ border: '1px solid gray', padding: '20px', borderRadius: '8px' }}>
        <h3>Employees per Department</h3>
        {Object.keys(departmentStats).length === 0 ? (
          <p>No data to display.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            {Object.entries(departmentStats).map(([dept, count]) => {
              const widthPercentage = (count / maxInDept) * 100;
              return (
                <div key={dept} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '120px', fontWeight: 'bold' }}>{dept}</div>
                  <div style={{ flex: 1, background: '#e0e0e0', height: '24px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${widthPercentage}%`, 
                        background: '#1890ff', 
                        height: '100%', 
                        transition: 'width 0.3s ease' 
                      }} 
                    />
                  </div>
                  <div style={{ width: '40px', textAlign: 'right' }}>{count}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}