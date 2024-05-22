
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { register } from '../service/apiFacade';

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 1.2em;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #007BFF;
  color: #fff;
  cursor: pointer;
`;

const Register = ({ setIsAuthenticated, setUser }) => {
  const navigate = useNavigate(); // Get navigate function from react-router-dom

  const handleRegister = async (event) => {
    event.preventDefault();
    
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const data = await register(username, password); // Call register function from apiFacade
      // Assuming registration is successful
      setIsAuthenticated(true);
      setUser({ username: username, roles: ['user'] });

      // Redirect to home page after successful registration
      navigate('/home'); // Navigate to home page
    } catch (error) {
      console.error('Registration error:', error.message);
      // Handle registration error, e.g., display error message
    }
  };

  return (
    <RegisterForm onSubmit={handleRegister}>
      <Label>Username</Label>
      <Input type="text" name="username" placeholder="Enter Username" required />

      <Label>Password</Label>
      <Input type="password" name="password" placeholder="Enter password" required />

      <Button type="submit">Register</Button>
    </RegisterForm>
  );
};

export default Register;