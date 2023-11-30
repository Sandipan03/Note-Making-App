import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const navigate = useNavigate();
    const host="http://localhost:5000";
    const [credentials, setCredentials] = useState({email:"",password:""})
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            'method': 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            //save the auth token and  redirect
            localStorage.setItem('token',json.authtoken);
            props.showNotification("Logged in successfully","success");
            navigate("/");
          }
          else{
            props.showNotification("Invalid credentials","danger");
          }

    }
    const handleChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
  return (
    
    <div className="container">
        <h2 className="my-3">Please log in to continue</h2>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" onChange={handleChange} placeholder="Enter email" name="email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" onChange={handleChange} placeholder="Password" name="password"/>
    </Form.Group>
    <Button variant="primary" type="submit" disabled={credentials.password.length<5} onClick={handleSubmit}>
      Log in
    </Button>
  </Form>
  </div>
  )
}

export default Login