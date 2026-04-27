import { useAppSelector } from '../hooks/redux';
import { selectEmployeeStats } from '../store/slices/employeeSlice';

export default function Dashboard() {
  const stats = useAppSelector(selectEmployeeStats);

  const cards = [
    { label: 'Total Employees', value: stats.total, icon: '👥', color: 'blue' },
    { label: 'Active', value: stats.active, icon: '✅', color: 'green' },
    { label: 'Inactive', value: stats.inactive, icon: '🔴', color: 'red' },
    { label: 'Departments', value: stats.departments, icon: '🏢', color: 'purple' },
  ];

  return (
    <div className="dashboard">
      <h2 className="section-title">Dashboard Overview</h2>
      <div className="stats-grid">
        {cards.map(c => (
          <div key={c.label} className={`stat-card stat-${c.color}`}>
            <div className="stat-icon">{c.icon}</div>
            <div className="stat-num">{c.value}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="concept-grid">
        <ConceptCard title="What is Redux?" color="blue">
          Redux is a <strong>predictable state container</strong> for JavaScript apps. It centralises your application's state and logic, making state changes transparent and trackable. Best used in large-scale apps with complex global state — like this Employee Management System — where many components need to share and update the same data.
        </ConceptCard>
        <ConceptCard title="When NOT to use Redux" color="amber">
          Avoid Redux for <strong>small apps</strong> with simple state (e.g. a to-do list), when state is local to a single component, or when Context API + useState is sufficient. Redux adds boilerplate overhead — use it only when that cost is justified by complexity.
        </ConceptCard>
        <ConceptCard title="Immutable State Principle" color="green">
          Redux state must <strong>never be mutated directly</strong>. Always return new objects. Immutability enables time-travel debugging, predictable renders, and reliable equality checks. Redux Toolkit uses Immer under the hood, letting you write "mutating" syntax that's actually immutable.
        </ConceptCard>
        <ConceptCard title="Redux Data Flow Cycle" color="purple">
          <ol className="flow-list">
            <li>Component <strong>dispatches</strong> an action</li>
            <li>Action travels to the <strong>reducer</strong></li>
            <li>Reducer <strong>computes new state</strong> immutably</li>
            <li><strong>Store updates</strong> with new state</li>
            <li>UI <strong>re-renders</strong> via useSelector</li>
          </ol>
        </ConceptCard>
      </div>
    </div>
  );
}

function ConceptCard({ title, color, children }) {
  return (
    <div className={`concept-card concept-${color}`}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
