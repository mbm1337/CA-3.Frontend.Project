

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, NavLink } from 'react-router-dom'; // Import useNavigate and NavLink
import { login } from '../service/apiFacade';


const Form = styled.form`
   background-color: white;
    padding: 3.125em;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 5px 5px 15px -1px rgba(0,0,0,0.75);
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 1.2em;
`;

const Input = styled.input`
 width: 100%;
    margin-bottom: 1.25em;
    height: 40px;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 0.8em;
    font-family: 'Inter', sans-serif;
    outline: none;
`;

const Error = styled.p`
  color: red;
`;

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const data = await login(username, password);
      if (!data) {
        setError('No data returned from login');
        return;
      }

      console.log('Token saved in localStorage:', data.token);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      navigate('/home');
    } catch (error) {
      setError('Failed to login');
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Username</Label>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <Label>Password</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <Error>{error}</Error>}

      <Input type="submit" value="Login" />

      {/* Link to Register page */}
      <NavLink to="/signup">Register</NavLink>
    </Form>
  );
};

export default Login;