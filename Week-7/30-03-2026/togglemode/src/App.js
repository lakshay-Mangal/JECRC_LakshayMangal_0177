import './App.css';
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(prev => !prev);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="App">
      <button onClick={toggleMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <p> This is sample text for checking if mode change is working</p>
    </div>
  );
}

export default App;