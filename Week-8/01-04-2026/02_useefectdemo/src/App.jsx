import { useState } from 'react'
import { useEffect } from 'react'

import './App.css'

function App() {
  const [count, setCount ] = useState(0)
  const [text,setText]= useState(0)

    //effect-1 runs after every render
    useEffect(()=>{
      console.log("Effect 1 : After every Render")
    });
  return (
   <div>
  <h1> UseEffect - Every Render</h1>
    {/* cOUNTER*/ }
    <h2> Count :{count} </h2>
    <button onClick={()=> setCount(prev=>prev+1)}>
      Increment 
    </button>
    {/* Input Field */ }
    <div>
      <input 
        type ="text" placeholder='Type Something..' value={text} onChange={(e)=> setText(e.target.value)}/>
    </div>
    <p> Open Console to observe logs</p>
   </div>
  )
}

export default App