import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { url } from '../App';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function NewPassword() {

  let [password, setPassword] = useState("");

  let { randomString } = useParams();

  let navigate = useNavigate();
  

  let handlePassword = async()=>{

    let payload = {password}
    try{
      let res = await axios.put(`${url}/users/update-password/${randomString}`, payload);
      toast.success(res.data.message);
      navigate(`/`);
    }
    catch (error){
      toast.error(error.response.data.message);
      console.log(error)
    }
  }
  
  return (

    <div className='login-wrapper'>
      <h1 className='nav-text' style={{"textAlign":"center"}}>Reset your Password Page</h1>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter New Password</Form.Label>
        <Form.Control type="password" placeholder="Enter new password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" onClick={()=>handlePassword()}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default NewPassword;