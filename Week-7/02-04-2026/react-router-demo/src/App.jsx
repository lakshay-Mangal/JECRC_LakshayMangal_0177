import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Homepage from "./Homepage";
import About from "./About";
import Contact from "./Contact";

function App() {
  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        <NavLink to="/" style={styles.link} end>Home</NavLink>
        <NavLink to="/about" style={styles.link}>About</NavLink>
        <NavLink to="/contact" style={styles.link}>Contact</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
//styles
const styles ={
  nav: {
    display : "flex",
    gap: "20px",
    padding: "15px",
    background: "#eee",
    justifyContent: "center"
  },
  link : 
    ({isActive}) => ({
      textDecoration : "none",
      color: isActive ? "red" : "black",
      fontWeight: isActive ? "bold": "normal"
    })
}
export default App;