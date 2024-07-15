import React, { useState } from 'react';


const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();


    const endpoint = isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/signup';
    const body = isLogin ? { email, password } : { username, email, password };


    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });


      const result = await response.text();
      console.log(result); // Log the response to the console
      alert(result); // Show an alert with the response
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please check the console for details.');
    }
  };


  return (
    <div className="container">
      <h1 id="formTitle">{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form id="authForm" onSubmit={handleSubmit}>
        {isLogin ? null : (
          <div>
            <label htmlFor="username" id="usernameLabel">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
        )}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit" id="submitButton">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <div className="toggle" id="toggleForm" onClick={handleToggleForm}>
        {isLogin ? 'Dont have an account? Sign Up' : 'Already have an account? Login'}
      </div>
    </div>
  );
};


export default LoginForm;

