function Homepage(){
return (
    <div style={styles.container}>
        <h1> Home Page</h1>
        <p> Welcome to our React Router Demo</p>
        <p> This is the Homepage where users land first.</p>
    </div>
)
}
const styles ={
    container : {
        textAlign: "center",
        padding: "40px",
        background : "#f0f8ff"
    }
}
export default Homepage;