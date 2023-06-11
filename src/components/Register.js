import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { url } from '../App';
import {toast} from 'react-toastify';
import axios from 'axios';

function Register() {

  let [userName, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();



  let handleRegisterUser = async()=>{
    let payload = {userName, email, password}
    try{
      let res = await axios.post(`${url}/users/adduser`, payload);
      toast.success(res.data.message);
      navigate(`/`);
    }
    catch (error){
      toast.error(error.response.data.message);
      console.log(error)
    }
  }

  let handleForgot = async()=>{
    navigate(`/users/forgotpassword/:email`);
    
  }

  
  return (
    <div className='login-wrapper'>
      <h1 className='nav-text' style={{"textAlign":"center"}}>Register Page</h1>
    <Form>

    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="Enter your Username" 
        onChange={(e)=>setUsername(e.target.value)}
        />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" 
        onChange={(e)=>setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        onChange={(e)=>setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <div className = "buttons">
      <Button variant="primary" onClick={()=>handleRegisterUser()}>
        Submit
      </Button>
      <Button variant="primary" onClick={()=>handleForgot()}>
        Forgot Password
      </Button>
      </div>
    </Form>
    </div>
  );
}

export default Register;