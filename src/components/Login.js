import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { url } from '../App';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Dashboard from './DashBoard';


const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();


  const handleLogin = async()=>{

    let payload = {email, password}
    try{
      let res = await axios.post(`${url}/users/login`, payload);
      toast.success(res.data.message);
      sessionStorage.setItem('token', res.data.token);
     navigate('/queries');
     sessionStorage.setItem('loggedEmail' , email)
    }
    catch (error){
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  
 


  let handleRegsiter = async()=>{
    navigate(`/users/adduser`);
    
  }

  let handleForgot = async()=>{
    navigate(`/users/forgotpassword/:email`);
    
  }

  return (
    <Dashboard title= "Login Page">
    <div className='login-wrapper'>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <div className = "buttons">
      <Button variant="primary" onClick={()=>handleRegsiter()}>
        Regsiter
      </Button>
      <Button variant="primary" onClick={()=>handleLogin()}>
        Login
      </Button>
      <Button variant="primary" onClick={()=>handleForgot()}>
        Forgot Password ?
      </Button>
      </div>
    </Form>
    </div>
    </Dashboard>
  );
}


export default Login;