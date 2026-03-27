

import React from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import UserProfile from "./components/UserProfile";

function App() {
  const handleEdit = () => {
    alert("Edit Profile Clicked!");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1> Props Validation Demo </h1>
      <UserProfile
        name="John Doe"
        age={30}
        email="john.doe@example.com"
        isActive={true}
        hobbies={["Reading", "Hiking", "Cooking"]}
        onEdit={handleEdit}
      />
      <UserProfile
        name="Jane Smith"
        age="twenty"
        email="jane.smith@example.com"
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;