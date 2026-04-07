import { NavLink } from "react-router-dom";

function Navbar(){
    return(
        <nav style={styles.nav}>
            <h2 style={styles.logo}> My App</h2>
            <div>
                <NavLink to="/" style={styles.link} end> Home</NavLink>
                <NavLink to="/about" style={styles.link} end> About</NavLink>
                <NavLink to="/contact" style={styles.link} end> Contact</NavLink>
            </div>
        </nav>
    )
}

const styles= {
    nav: {
        display : "flex",
        justifyCenter: "space-between",
        padding:  "15px",
        background: "#1e293b",
        color: "white",
        alignItems: "center"
    },
    logo: {
        margin:0
    },
    link: ({ isActive}) => ({
        margin: "0 10px",
        textDecoration: "none",
        color: isActive ? "#38bdf8" : "white",
        fontWeight: isActive ? "bold": "normal"
    })
};

export default Navbar;