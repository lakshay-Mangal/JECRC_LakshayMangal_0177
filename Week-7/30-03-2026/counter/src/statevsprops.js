import React, { useState } from "react";

function DisplayCard({ title, value, onChange, style }) {
  const [internalCount, setInternalCount] = useState(0);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        margin: "10px",
        width: "250px",
        textAlign: "center",
        backgroundColor: style?.backgroundColor,
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
      }}
    >
      <h3>{title}</h3>

      <p>Props Value (Parent): {value}</p>
      <p>Internal State: {internalCount}</p>

      <button onClick={() => setInternalCount(internalCount + 1)}>
        Update Internal Count
      </button>

      <br/><br/>

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
    <div style={{ textAlign: "center" }}>
      <h2>State vs Props Demo</h2>

      <p>Parent Count: {parentCount}</p>

      <button onClick={() => setParentStep(parentStep + 1)}>
        Increase Step (Current: {parentStep})
      </button>

      <button
        onClick={() =>
          setDisplayColor(
            displayColor === "lightblue" ? "lightcoral" : "lightblue"
          )
        }
        style={{ marginLeft: "10px" }}
      >
        Toggle Display Color
      </button>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <DisplayCard
          title="Child Component 1"
          value={parentCount}
          onChange={handleParentCountChange}
          style={{ backgroundColor: displayColor }}
        />

        <DisplayCard
          title="Child Component 2"
          value={parentCount}
          onChange={handleParentCountChange}
          style={{ backgroundColor: displayColor }}
        />
      </div>
    </div>
  );
}

export default StateVsPropsDemo;