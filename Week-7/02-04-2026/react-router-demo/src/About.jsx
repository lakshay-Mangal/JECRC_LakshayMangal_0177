import React from "react";

function About(){
    return(
        <div style={styles.container}>
            <h1> About Page</h1>
            <p> This application demonstrates React Router Components</p>
            <p> includese navigation, routing and component rendering</p>
        </div>
    )
}

const styles = {
    container : {
        textAlign: "center",
        padding: "40px",
        background : "#fff4cd"
    }
}
export default About;