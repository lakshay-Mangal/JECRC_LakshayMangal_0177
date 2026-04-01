import { useState } from "react";

function Lazyinit(){
    //Lazy initializtion (runs only once)
    const[data, setData]= useState(()=>{
        console.log("Expensive computation running....");

        let result =0;
        for(let i=0;i<10000;i++){
            result+=i;
        }
        return result%1000;
    });
    //update without  re-running expensive logic
    const recalcluateData= ()=>{
        setData(prev=>{
            console.log("Recalculating data...");
            return prev+100;
        });
    };
    return (
        <div>
        <h1> Lazy initializtion Demo</h1>
        <h2> Computed Value :{data}</h2>
        <button onClick={recalcluateData}>Recalculate (+100) </button>
        <p>
            Expensive calculation runs only once on initial render
        </p>
        <p> Open console to observe logs</p>
        </div>

    )
}

export default Lazyinit;