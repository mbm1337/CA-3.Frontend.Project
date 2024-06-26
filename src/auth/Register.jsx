
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { register } from '../service/apiFacade';

const RegisterForm = styled.form`
background-color: white;
    padding: 3.125em;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    box-shadow: 5px 5px 15px -1px rgba(0,0,0,0.75);
`;

const Div = styled.div`
    width: 500px;
    min-height: 570px;
    margin: 100px auto;
`;

const Button= styled.button`
    background-color:#c5d4db;
    align-self:center;
    margin-top:25px;
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
    padding-left:5px;
`;



const Register = () => {
  const navigate = useNavigate();
  const handleRegister = async (event) => {
    event.preventDefault();
    
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const data = await register(username, password); //
      console.log(data+  "sumaia-register")
      if(data){
      alert("account has been created")
      // Redirect to home page after successful registration
      navigate('/'); // Navigate to home page
      }
    } catch (error) {
      console.error('Registration error:', error.message);
      alert("the email already exist ")
      // Handle registration error, e.g., display error message
    }
  };

  return (
    <Div>
    <RegisterForm onSubmit={handleRegister}>
      
      <Label>Email</Label>
      <Input type="email" name="username" placeholder="Enter Username" required />

      <Label>Password</Label>
      <Input type="password" name="password" placeholder="Enter password" required />
      <Button type='submit'>Register</Button>
    </RegisterForm>
    </Div>
  );
};

export default Register;