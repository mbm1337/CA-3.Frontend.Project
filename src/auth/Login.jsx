import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/apiFacade';

const Form = styled.form`
  background-color: white;
  padding: 3.125em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 5px 5px 15px -1px rgba(0,0,0,0.75);
`;

const Label = styled.label`
  color: rgb(77, 75, 75);
  text-transform: uppercase;
  letter-spacing: 2px;
  display: block;
  font-weight: bold;
  font-size: x-large;
  margin-bottom: 0.5em;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 1.25em;
  height: 40px;
  border-radius: 5px;
  border: 1px solid gray;
  padding: 0.3em;
  font-family: 'Inter', sans-serif;
  outline: none;
`;

const Error = styled.p`
  color: red;
`;

const Btn = styled.p`
  align-self: center
`;

const Div = styled.div`
  width: 500px;
  min-height: 570px;
  margin: 100px auto;
`;

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      console.log('Response', response);

      if (response && response.token && response.roles) {
        console.log('Login successful, navigating to /dashboard');
        localStorage.setItem('token', response.token); // Save token to localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('roles', JSON.stringify(response.roles)); // Save roles to localStorage as a JSON string
        console.log(username);
        setIsAuthenticated(true); // Update isAuthenticated
        navigate('/');
      } else {
        console.error('Invalid response structure', response);
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Error during login', err);
      setError('An error occurred');
    }
  };

  return (
    <Div>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Error>{error}</Error>}
        <button type="submit" onClick={() => console.log('Button clicked')}>Login</button>
      </Form>
    </Div>
  );
};

export default Login;
