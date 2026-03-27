import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);
    const [timestamp, setTimeStamp] = useState(new Date().toLocaleTimeString());

    const updateTime = () => {
        setTimeStamp(new Date().toLocaleTimeString());
    };

    return (
        <div>
            <h1>Virtual DOM Demo</h1>

            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                <h2>Counter: {count}</h2>
                <button onClick={() => setCount(count + 1)}>
                    Increment (Re-renders)
                </button>
            </div>

            <div style={{ padding: '20px', marginTop: '20px', border: '1px solid #ccc' }}>
                <h2>Timestamp: {timestamp}</h2>
                <button onClick={updateTime}>
                    Update time (only this changes)
                </button>
            </div>

            <p style={{ color: 'gray' }}>
                Static Content - React doesn't touch this
            </p>
        </div>
    );
}

export default App;