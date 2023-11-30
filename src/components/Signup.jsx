import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  const navigate = useNavigate();
    const host="http://localhost:5000";
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const handleSubmit= async (e)=>{
        e.preventDefault();
        if (credentials.password!==credentials.cpassword){
          // alert("The password and its confirm do not match.Please check and try again.");
          props.showNotification("The password and its confirm do not match.Please check and try again.","danger");
          return;
        }
        const response = await fetch(`${host}/api/auth/createuser`, {
            'method': 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            //save the auth token and  redirect
            localStorage.setItem('token',json.authtoken);
            props.showNotification("Signed up successfully","success");
            navigate("/");
          }
          else{
            // alert("Sorry! A user with this email already exists");
            props.showNotification("Sorry! A user with this email already exists","danger");
          }

    }
    const handleChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
  return (
    
    <div className="container">
      <h2 className="my-3">Sign up for free</h2>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Name</Form.Label>
      <Form.Control type="email" onChange={handleChange} placeholder="Enter name" name="name" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" onChange={handleChange} placeholder="Enter email" name="email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" onChange={handleChange} placeholder="Password" name="password"/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" onChange={handleChange} placeholder="Confirm Password" name="cpassword"/>
    </Form.Group>
    <Button variant="primary" type="submit" disabled={credentials.name.length<3 || credentials.password.length<5 || credentials.cpassword.length<5} onClick={handleSubmit}>
      Sign up
    </Button>
  </Form>
  </div>
  )

}

export default Signup