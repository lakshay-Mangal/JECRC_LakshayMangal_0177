import { useEffect, useState } from "react";

function App2() {
  // 1. Lazy Initialization: Read from local storage exactly once on load.
  const [name, setName] = useState(() => {
    const savedName = localStorage.getItem("name");
    return savedName ? savedName : "";
  });

  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  // 2. Only ONE useEffect is needed now, just to save data when it changes.
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("count", count);
  }, [name, count]);

  return (
    <div>
      <input
        type="text"
        placeholder="enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h3> hello, {name || "Guest"} </h3>

      <h2>Count : {count} </h2>
      
      {/* 3. Fixed the onClick handler to use an arrow function */}
      <button onClick={() => setCount((prev) => prev + 1)}> Increment</button>
      
      <button
        onClick={() => {
          setName("");
          setCount(0);
          localStorage.clear();
        }}
      >
        {" "}
        Reset
      </button>
      
      <p> Data is saved in <b> local storage</b> and restored on refresh </p>
      <p> refresh the page to test persistence</p>
    </div>
  );
}

export default App2;