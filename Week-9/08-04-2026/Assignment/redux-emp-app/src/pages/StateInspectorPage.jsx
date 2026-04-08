import { useState } from 'react';
import { useAppSelector } from '../hooks/redux';

function JsonNode({ data, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(depth > 1);

  if (data === null) return <span className="json-null">null</span>;
  if (typeof data === 'boolean') return <span className="json-bool">{String(data)}</span>;
  if (typeof data === 'number') return <span className="json-num">{data}</span>;
  if (typeof data === 'string') return <span className="json-str">"{data}"</span>;

  if (Array.isArray(data)) {
    if (data.length === 0) return <span className="json-bracket">[]</span>;
    return (
      <span>
        <button className="json-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '▶' : '▼'} [{data.length}]
        </button>
        {!collapsed && (
          <div className="json-block">
            {data.map((item, i) => (
              <div key={i} className="json-row">
                <span className="json-key">{i}</span>
                <span className="json-colon">: </span>
                <JsonNode data={item} depth={depth + 1} />
                {i < data.length - 1 && <span className="json-comma">,</span>}
              </div>
            ))}
          </div>
        )}
      </span>
    );
  }

  if (typeof data === 'object') {
    const keys = Object.keys(data);
    if (keys.length === 0) return <span className="json-bracket">{'{}'}</span>;
    return (
      <span>
        <button className="json-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '▶' : '▼'} {'{'}…{'}'}
        </button>
        {!collapsed && (
          <div className="json-block">
            {keys.map((k, i) => (
              <div key={k} className="json-row">
                <span className="json-key">"{k}"</span>
                <span className="json-colon">: </span>
                <JsonNode data={data[k]} depth={depth + 1} />
                {i < keys.length - 1 && <span className="json-comma">,</span>}
              </div>
            ))}
          </div>
        )}
      </span>
    );
  }

  return <span>{String(data)}</span>;
}

export default function StateInspectorPage() {
  const fullState = useAppSelector(s => s);
  const [activeSlice, setActiveSlice] = useState('employees');

  const slices = Object.keys(fullState).filter(k => k !== 'activity');
  const sliceData = activeSlice === '__all__' ? fullState : fullState[activeSlice];

  return (
    <div className="inspector-page">
      <h2 className="section-title">Live State Inspector</h2>
      <p className="activity-sub">Real-time view of the Redux store. The tree updates instantly on every dispatch.</p>

      <div className="inspector-layout">
        <div className="inspector-sidebar">
          <div className="inspector-sidebar-title">Slices</div>
          {slices.map(s => (
            <button
              key={s}
              className={`inspector-slice-btn ${activeSlice === s ? 'active' : ''}`}
              onClick={() => setActiveSlice(s)}
            >
              <span className="slice-icon">
                {s === 'employees' ? '👥' : s === 'auth' ? '🔑' : s === 'ui' ? '🎨' : '📋'}
              </span>
              {s}
            </button>
          ))}
          <button
            className={`inspector-slice-btn ${activeSlice === '__all__' ? 'active' : ''}`}
            onClick={() => setActiveSlice('__all__')}
          >
            <span className="slice-icon">🌐</span>
            Full State
          </button>
        </div>

        <div className="inspector-content">
          <div className="inspector-toolbar">
            <span className="inspector-path">
              state{activeSlice !== '__all__' ? `.${activeSlice}` : ''}
            </span>
            <span className="inspector-size">
              {JSON.stringify(sliceData).length} bytes
            </span>
          </div>
          <div className="json-viewer">
            <JsonNode data={sliceData} depth={0} />
          </div>
        </div>
      </div>
    </div>
  );
}
