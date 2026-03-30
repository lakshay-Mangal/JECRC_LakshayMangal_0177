
import React ,{useState} from "react";

function Counter(){

    const [count, setCount] = useState(0);
    const [lastAction, setLastAction]= useState("None");
    const [step, setStep] = useState(1);
    const increment = ()=> {setCount(count+step); setLastAction("Incremented by "+step) };
    const decrement = ()=> {setCount(count-step); setLastAction("decremented by "+step) };
    const reset = ()=> {setCount(0); setLastAction("Reset")}

    return (
    <div style={{padding:'20px' ,textAlign: 'center'}}>
    <div style={{fontSize: '48px', margin:'20px'}}>
        <h1>Counter : {count} </h1>
        </div>
        {/* Step input*/}
    <div style={{marginBottom:'20px'}}>
        <label> Step :
        <input type="number" value={step} onChange={(e)=> setStep(Number(e.target.value))} style={{marginLeft:'10px', width:'60px'}}/> </label>
    </div>
        <div>
            <button onClick={increment}> Increment</button>
            <button onClick={decrement}> Decrement</button>
            <button onClick={reset} style={{marginLeft: '10px'}}> Reset</button>
        </div>

        <div style={{marginTop: '20px', fontStyle: 'italic'}}> 
        Last Action: {lastAction} </div>
    </div>
);

}
const buttonStyle = {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px'
}
export default Counter;
