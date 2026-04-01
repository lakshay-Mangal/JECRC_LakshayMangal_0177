import React, { useReducer, useState } from "react";

function UseReducer() {

  // 🔹 Initial State
  const initialCounterState = {
    count: 0,
    history: []
  };

  // 🔹 Reducer Function
  function counterReducer(state, action) {
    switch (action.type) {
      case "increment":
        return {
          count: state.count + 1,
          history: [
            ...state.history,
            { type: "increment", value: state.count + 1, time: new Date().toLocaleTimeString() }
          ]
        };

      case "decrement":
        return {
          count: state.count - 1,
          history: [
            ...state.history,
            { type: "decrement", value: state.count - 1, time: new Date().toLocaleTimeString() }
          ]
        };

      case "reset":
        return {
          count: 0,
          history: [
            ...state.history,
            { type: "reset", value: 0, time: new Date().toLocaleTimeString() }
          ]
        };

      case "set":
        return {
          count: action.payload,
          history: [
            ...state.history,
            { type: "set", value: action.payload, time: new Date().toLocaleTimeString() }
          ]
        };

      default:
        return state;
    }
  }

  // 🔹 useReducer Hook
  const [counterState, dispatch] = useReducer(counterReducer, initialCounterState);

  // 🔹 Input State for SET
  const [inputValue, setInputValue] = useState("");

  return (
    <div style={styles.container}>
      <h1>useReducer Counter (Advanced)</h1>

      <h2>Count: {counterState.count}</h2>

      {/* 🔹 Actions */}
      <div>
        <button style={styles.btn} onClick={() => dispatch({ type: "increment" })}>
          +1
        </button>

        <button style={styles.btn} onClick={() => dispatch({ type: "decrement" })}>
          -1
        </button>

        <button style={styles.resetBtn} onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
      </div>

      {/* 🔹 Set Value */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.btn}
          onClick={() =>
            dispatch({ type: "set", payload: Number(inputValue) })
          }
        >
          Set Value
        </button>
      </div>

      {/* 🔹 History */}
      <h3 style={{ marginTop: "30px" }}>History</h3>

      <ul style={styles.list}>
        {counterState.history.map((item, index) => (
          <li key={index} style={styles.card}>
            <b>{item.type.toUpperCase()}</b> → {item.value}
            <br />
            <small>{item.time}</small>
          </li>
        ))}
      </ul>

      <p style={styles.info}>
        👉 useReducer is best for <b>complex state logic & history tracking</b>
      </p>
    </div>
  );
}

// 🎨 Styling
const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    fontFamily: "Arial"
  },
  btn: {
    margin: "10px",
    padding: "10px 15px",
    cursor: "pointer"
  },
  resetBtn: {
    margin: "10px",
    padding: "10px 15px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  input: {
    padding: "10px",
    marginRight: "10px"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  card: {
    border: "1px solid #ccc",
    margin: "10px auto",
    padding: "10px",
    width: "250px"
  },
  info: {
    marginTop: "20px",
    color: "green"
  }
};

export default UseReducer;