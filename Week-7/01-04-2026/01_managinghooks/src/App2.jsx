import { useState } from "react";

function App2(){
   const[count, setCount] = useState(0);

const increment= ()=>{
  setCount(prev=> prev+1);
}
const incrementByTwo = ()=>{
  setCount(prev=>prev+2);
}
const reset =()=>{
    setCount(0);
};
return (
    <div>
        <h1> Functional Update Demo</h1>
        <h2> Count : {count} </h2>
        <div>
            <button onClick={increment}> Increment</button>
            <button onClick={incrementByTwo}> Increment By Two</button>
            <button onClick={reset}> Reset</button>
        </div>
        <p>
            Using <b> prev state</b> ensures correct updates even when multiple updates happen quickly
        </p>
    </div>
)
}

export default App2;