import React from 'react';
import './App.css';
import LoginForm from './LoginForm';
import HomePage from './HomePage'; // Import the HomePage component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginForm />
        <HomePage /> {/* Add HomePage component */}
      </header>
    </div>
  );
}

export default App;
