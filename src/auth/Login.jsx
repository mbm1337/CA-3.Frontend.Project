

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
    <Div>

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

      <Input type="submit" value="Login" className='form--submit' />

      {/* Link to Register page */}
      <Btn><NavLink to="/signup">Register</NavLink></Btn>
    </Form>
    </Div>

  );
};

export default Login;