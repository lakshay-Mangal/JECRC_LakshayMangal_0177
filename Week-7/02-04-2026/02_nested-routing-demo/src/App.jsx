import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Homepage from './Homepage';
import About from './About';
import Contact from './Contact';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Layout/>}>
          <Route index element= {<Homepage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
