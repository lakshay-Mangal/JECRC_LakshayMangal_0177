import { useState,useReducer } from "react";
import "./App.css";

function  App(){
const[count, setCount] = useState(0);

const increment= ()=>{
  setCount(prev=> prev+1);
}
const incrementByTwo = ()=>{
  setCount(prev=>prev+2);
}

const resetCount= ()=>{
  setCount(0);
}
return(
  <div style={styles.container}>
    <h1> This is a Counter- App</h1>
  <h2> Count: <span className="highlight"> {count} </span> </h2>
  <button style={styles.btn}  onClick={()=>{setCount(count+1)}}>increment </button>
  <button style={styles.btn}  onClick={()=>{setCount(count-1)}}>decrement </button>
  <button style={styles.btn}  onClick={()=>{setCount(0)}}>Reset </button>
  </div>
)
}
const styles = {
  container : {
    textAlign : "center",
    marginTop : "50px"
  },
  btn :{
    margin : "10px",
    padding : "10px 20px",
    fontSize: "16px"
  }
}
export default App;