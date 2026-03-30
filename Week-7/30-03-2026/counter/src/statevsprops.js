import { useState } from "react";

function DisplayCard({ title, value, onChange, style }) {
  const [internalCount, setInternalCount] = useState(0);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        margin: "10px",
        width: "200px",
        textAlign: "center",
        ...style   
      }}
    >
      <h3>{title}</h3>
      <p>{value}</p>
      <p>Internal: {internalCount}</p>

      <button onClick={() => setInternalCount(c => c + 1)}>
        Update Internal Count
      </button>

      <button onClick={() => onChange(value + 1)}>
        Update Parent Count
      </button>
    </div>
  );
}

function StateVsPropsDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [parentStep, setParentStep] = useState(1);
  const [displayColor, setDisplayColor] = useState("lightblue");

  const handleParentCountChange = (newCount) => {
    setParentCount(newCount);
    setDisplayColor(newCount % 2 === 0 ? "lightblue" : "lightcoral");
  };

  return (
    <div style={{ padding: "20px" }}>
      <p>Parent Count: {parentCount}</p>

      <button onClick={() => setParentStep(s => s + 1)}>
        Increase Step (Current: {parentStep})
      </button>

      <button
        onClick={() =>
          setDisplayColor(c =>
            c === "lightblue" ? "lightcoral" : "lightblue"
          )
        }
        style={{ marginLeft: "10px" }}
      >
        Toggle display color
      </button>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <DisplayCard
          title="Child component Counter Card"
          value={parentCount}
          onChange={handleParentCountChange}
          style={{ backgroundColor: displayColor }}
        />
      </div>
    </div>
  );
}

export default StateVsPropsDemo;