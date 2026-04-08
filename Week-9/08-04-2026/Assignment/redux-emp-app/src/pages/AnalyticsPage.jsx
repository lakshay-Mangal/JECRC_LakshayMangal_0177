import { useAppSelector } from '../hooks/redux';
import { selectAllEmployees } from '../store/slices/employeeSlice';

const COLORS = {
  Engineering: '#2563eb',
  Product: '#7c3aed',
  Analytics: '#0d9488',
  Design: '#e11d48',
  HR: '#d97706',
  Finance: '#16a34a',
};

export default function AnalyticsPage() {
  const employees = useAppSelector(selectAllEmployees);

  // Department breakdown
  const deptMap = employees.reduce((acc, e) => {
    acc[e.department] = (acc[e.department] || { count: 0, salary: 0 });
    acc[e.department].count += 1;
    acc[e.department].salary += e.salary || 0;
    return acc;
  }, {});

  const depts = Object.entries(deptMap).map(([name, d]) => ({
    name,
    count: d.count,
    avgSalary: Math.round(d.salary / d.count),
    color: COLORS[name] || '#6b7280',
    pct: Math.round((d.count / employees.length) * 100),
  })).sort((a, b) => b.count - a.count);

  const maxSalary = Math.max(...depts.map(d => d.avgSalary));
  const maxCount = Math.max(...depts.map(d => d.count));

  // Status split
  const active = employees.filter(e => e.status === 'active').length;
  const inactive = employees.length - active;
  const activePct = employees.length ? Math.round((active / employees.length) * 100) : 0;

  // Salary distribution buckets
  const buckets = [
    { label: '<$80k', min: 0, max: 80000 },
    { label: '$80–95k', min: 80000, max: 95000 },
    { label: '$95–110k', min: 95000, max: 110000 },
    { label: '>$110k', min: 110000, max: Infinity },
  ];
  const salaryDist = buckets.map(b => ({
    ...b,
    count: employees.filter(e => e.salary >= b.min && e.salary < b.max).length,
  }));
  const maxBucket = Math.max(...salaryDist.map(b => b.count), 1);

  return (
    <div className="analytics-page">
      <h2 className="section-title">Analytics</h2>

      <div className="analytics-grid">
        {/* Department headcount bar chart */}
        <div className="analytics-card wide">
          <h3 className="card-title">Headcount by Department</h3>
          <div className="bar-chart">
            {depts.map(d => (
              <div key={d.name} className="bar-row">
                <div className="bar-label">{d.name}</div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${(d.count / maxCount) * 100}%`, background: d.color }}
                  />
                </div>
                <div className="bar-val">{d.count} <span className="bar-pct">({d.pct}%)</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Avg salary by dept */}
        <div className="analytics-card wide">
          <h3 className="card-title">Average Salary by Department</h3>
          <div className="bar-chart">
            {depts.map(d => (
              <div key={d.name} className="bar-row">
                <div className="bar-label">{d.name}</div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${(d.avgSalary / maxSalary) * 100}%`, background: d.color, opacity: 0.8 }}
                  />
                </div>
                <div className="bar-val">${d.avgSalary.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Active vs inactive donut */}
        <div className="analytics-card">
          <h3 className="card-title">Employee Status</h3>
          <div className="donut-wrap">
            <svg viewBox="0 0 120 120" width="120" height="120">
              <circle cx="60" cy="60" r="46" fill="none" stroke="var(--border)" strokeWidth="18" />
              <circle
                cx="60" cy="60" r="46" fill="none"
                stroke="#2563eb" strokeWidth="18"
                strokeDasharray={`${activePct * 2.89} ${(100 - activePct) * 2.89}`}
                strokeDashoffset="72.25"
                strokeLinecap="round"
              />
              <text x="60" y="56" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">{activePct}%</text>
              <text x="60" y="70" textAnchor="middle" fontSize="9" fill="var(--text2)">Active</text>
            </svg>
            <div className="donut-legend">
              <div className="legend-row"><span className="legend-dot" style={{ background: '#2563eb' }} />Active — {active}</div>
              <div className="legend-row"><span className="legend-dot" style={{ background: 'var(--border)' }} />Inactive — {inactive}</div>
            </div>
          </div>
        </div>

        {/* Salary distribution */}
        <div className="analytics-card">
          <h3 className="card-title">Salary Distribution</h3>
          <div className="dist-chart">
            {salaryDist.map(b => (
              <div key={b.label} className="dist-col">
                <div className="dist-bar-wrap">
                  <div
                    className="dist-bar"
                    style={{ height: `${maxBucket ? (b.count / maxBucket) * 80 : 0}px` }}
                  />
                </div>
                <div className="dist-count">{b.count}</div>
                <div className="dist-label">{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Department table */}
        <div className="analytics-card wide">
          <h3 className="card-title">Department Summary</h3>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Headcount</th>
                <th>Avg Salary</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {depts.map(d => (
                <tr key={d.name}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, display: 'inline-block' }} />
                      {d.name}
                    </div>
                  </td>
                  <td>{d.count}</td>
                  <td>${d.avgSalary.toLocaleString()}</td>
                  <td>
                    <div className="share-bar-wrap">
                      <div className="share-bar" style={{ width: `${d.pct}%`, background: d.color }} />
                      <span>{d.pct}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
