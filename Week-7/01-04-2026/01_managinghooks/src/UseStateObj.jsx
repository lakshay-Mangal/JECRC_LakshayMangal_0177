import React, { useState } from "react";

function UseStateObj() {

  // 🔹 Object State
  const [user, setUser] = useState({
    name: "",
    age: "",
    email: ""
  });

  // 🔹 Update Name
  const updateUserName = (name) => {
    setUser(prev => ({
      ...prev,
      name: name
    }));
  };

  // 🔹 Update Age
  const updateUserAge = (age) => {
    setUser(prev => ({
      ...prev,
      age: age
    }));
  };

  // 🔹 Update Email
  const updateUserEmail = (email) => {
    setUser(prev => ({
      ...prev,
      email: email
    }));
  };

  const resetUser= () =>{
    setUser({
      name: "",
      age: "",
      email: ""
    });
  };

    // 🔹 Styles
  const styles = {
    container: {
      textAlign: "center",
      marginTop: "50px"
    },
    input: {
      display: "block",
      margin: "10px auto",
      padding: "8px",
      width: "200px"
    },
    btn: {
      padding: "10px 20px",
      marginTop: "10px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <h1>Object State Demo</h1>

      {/* 🔹 Input Fields */}
      <input
        type="text"
        placeholder="Enter Name"
        value={user.name}
        onChange={(e) => updateUserName(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Enter Age"
        value={user.age}
        onChange={(e) => updateUserAge(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Enter Email"
        value={user.email}
        onChange={(e) => updateUserEmail(e.target.value)}
        style={styles.input}
      />

      {/* 🔹 Buttons */}
      <button style={styles.btn} onClick={resetUser}>
        Reset
      </button>

      {/* 🔹 Display Data */}
      <h2>User Data</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );

}

export default UseStateObj;