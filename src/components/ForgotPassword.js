import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { url } from '../App';
import axios from 'axios';


function ForgotPassword() {

  let [email, setEmail] = useState("");

  let handleChange = async()=>{
    try{
      let res = await axios.get(`${url}/users/forgotpassword/${email}`);
      toast.success("Check your email for password reset link");
      //console.log(res.data.userByID);
    }
    catch (error){
      toast.error(error.response.data.message);
      console.log(error)
    }
  }
  
  return (

    <div className='login-wrapper'>
      <h1 style={{"textAlign":"center"}}>Reset your Password Page</h1>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" onClick={()=>handleChange()}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default ForgotPassword;