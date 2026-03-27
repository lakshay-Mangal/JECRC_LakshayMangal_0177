import React from 'react';

function App() {

  const userName = "Alice Johnson";
  const userRole = "Developer";
  const isLoggedIn = true;
  const unreadMessages = 5;

  // Greeting function
  const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  // Notification badge (conditional rendering)
  const notificationBadge =
    unreadMessages > 0 ? (
      <span className="badge">{unreadMessages}
      </span>
    ) : null;

  return (
    <div>
      <h1>{getGreeting()}, {userName}!</h1>

      <p>Your role: {userRole}</p>

      {isLoggedIn ? (
        <div>
          <p>You have {unreadMessages} unread messages.</p>
          {notificationBadge}
        </div>
      ) : (
        <p>Please log in to see your messages.</p>
      )}

      {/*List rendering example */}
       <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;