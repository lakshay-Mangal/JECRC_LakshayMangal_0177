import React from "react";
import Header from "./components/Header";
import Card from "./components/Card";

function App() {
  const projects = [
    {id: 1, title: "React-App", content: "An app for building websites",icon:"🔮", isFeatured: true},
    {id: 2, title: "API Service", content: "Restful API Integration.",icon:"🈂️" ,isFeatured: false},
    {id: 3, title: "Mobile- App", content: "A groundbreaking mobile app project.", icon: "📱"}
  ];

  return (
    <div>
      <Header 
      title="component composition demo"
      subtitle="Building UIs with reusable pieces"
      />
      <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px' }}>
        {projects.map((project) => (
          <Card
            key={project.id}
            title={project.title}
            content={project.content}
            icon={project.icon}
            isFeatured={project.isFeatured}
          />
        ))}
      </div>
    </div>
  );
}

export default App;