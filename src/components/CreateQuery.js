import React, { useState } from 'react'
import Dashboard from './DashBoard'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';
import { toast } from 'react-toastify';
import { url } from '../App';
import axios from 'axios';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';




const CreateQuery = () => {
    let navigate = useNavigate();
    let email = sessionStorage.getItem('loggedEmail');
    let [category, setCategory] = useState("");
    let [subCategory, setsubCategory] = useState("");
    let [language, setLanguage] = useState("");
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    const [time, setTime] = useState("");

  
  let userNames = sessionStorage.getItem('userName')

  let logout = ()=>{
    if (window.confirm("Are you sure you want to logout?")){
      var solved = "You pressed OK!";
    if(solved == "You pressed OK!"){
      sessionStorage.clear();
      navigate('/');
    }
  }
  else {
    solved = "You pressed Cancel!";
  }
  }


    const handleCreate = async()=>{
        let payload = {category, subCategory, language , title , description , 
            time : `${time.$d.toString().slice(16,21)}`,
            email }

        try{
          let res = await axios.post(`${url}/queries/addquery`, payload);
          toast.success(res.data.message);
          navigate('/queries');
        }
        catch (error){
          toast.error(error.response.data.message);
          console.log(error);
        }
    }


  return (
    <Dashboard>
      <div className="nav-bar">
                <h1 className='nav-text'>Create your Query</h1>
                <div className="profile">
                <span >{userNames}</span><AccountCircleIcon sx={{ fontSize: 60 }} className="icons"
                onClick={()=>logout()}
                />
                </div>
      </div>
        <div className='create-query'>
        <button className='create-btn' onClick={()=>navigate('/queries')}>Go Back</button>
      </div>
      <div className='container'>
      <div className='topic'><span>Topic</span><br/></div>
       <div className='baseContainer'>
       <div className = 'queryCategory'> 
          <span className ="spanOpacity"> Category</span>
          <Form.Select aria-label="Default select example"  onChange={(e)=>setCategory(e.target.value)}>
          <option>--- Select Category---</option>
          <option>Zen-Class Doubt</option>
          <option>Placement Related</option>
          <option>Coordination Related</option>
          <option>Pre-BootCamp Related</option>
          </Form.Select>
          {category == "--- Select Category---" ? <p style={{color:"crimson"}} className='errors'>Select a Category</p> : ""}
      </div>

      { category == '--- Select Category---' ? "" : category == 'Zen-Class Doubt' ? 
      <div className = 'queryCategory'> 
      <div className='selectCategory'>
          <span className ="spanOpacity"> Subcategory</span>
          <Form.Select aria-label="Default select example" onChange={(e)=>setsubCategory(e.target.value)}>
          <option>--- Select Sub Category---</option>
          <option>Task</option>
          <option>WebCode</option>
          <option>Webkata</option>
          <option>Codekata</option>
          <option>Assesment</option>
          </Form.Select>
          {subCategory == "--- Select Sub Category---" ? <p style={{color:"crimson"}} className='errors'>Select a Sub-Category</p> : ""}
          </div>
      </div> : category == 'Placement Related' ?

      <div className = 'queryCategory'> 
      <div className='selectCategory'>
          <span className ="spanOpacity"> Subcategory</span>
          <Form.Select aria-label="Default select example" onChange={(e)=>setsubCategory(e.target.value)}>
          <option>--- Select Sub Category---</option>
          <option>Company Info</option>
          <option>Completion Certificate</option>
          <option>Portfolio</option>
          </Form.Select>
          </div>
      </div> : category == 'Coordination Related' ?

    <div className = 'queryCategory'> 
    <div className='selectCategory'>
        <span className ="spanOpacity"> Subcategory</span>
        <Form.Select aria-label="Default select example" onChange={(e)=>setsubCategory(e.target.value)}>
        <option>--- Select Sub Category---</option>
        <option>Session Timing</option>
        <option>Session Joining Link</option>
        <option>Session Feedback</option>
        <option>Completion Certificate</option>
        <option>Payment</option>
        </Form.Select>
        </div>
    </div> : category == 'Pre-BootCamp Related' ? 
    <div className = 'queryCategory'> 
    <div className='selectCategory'>
        <span className ="spanOpacity"> Subcategory</span>
        <Form.Select aria-label="Default select example" onChange={(e)=>setsubCategory(e.target.value)}>
        <option>--- Select Sub Category---</option>
        <option>Session</option>
        <option>Payment</option>
        <option>CodeKata</option>
        <option>WebKata</option>
        <option>Task</option>
        <option>Other</option>
        </Form.Select>
        </div>
    </div> : ""
      }


      <div className = 'queryCategory'>
      <div className='selectSubCategory'> 
          <span className ="spanOpacity">Prefered Voice Communication Language</span>
          <Form.Select aria-label="Default select example" onChange={(e)=>setLanguage(e.target.value)}>
          <option>--- Select Language---</option>
          <option>English</option>
          <option>Hindi</option>
          <option>Tamil</option>
          </Form.Select>
          {language == "--- Select Language---" ? <p style={{color:"crimson"}} className='errors'>Select a Language</p> : ""}
          </div>  
      </div>


    </div>

    <div className='topic'><span>Details</span><br/></div>
    <div className='baseContainer'>
    <div className = 'queryCategory'>
      <div className='selectSubCategory'> 
      <div className='text-field'>
          <span className ="spanOpacity">Query Title</span>
      <TextField
          required
          id="outlined-required"
          label="Enter the query title"
          onChange={(e)=>setTitle(e.target.value)}
        />
      <span className ="spanOpacity">Query Description</span>
      <TextField
          required
          id="outlined-required"
          label="Enter the query description"
          multiline
          rows={4}
          onChange={(e)=>setDescription(e.target.value)}
        />
        </div>
      </div>
    </div> 
    </div>

    <div className='topic'><span>Your available Time ? ( Ours : 9:00 AM - 7:00 PM )</span><br/></div>
    <div className='baseContainer'>
    <div className = 'queryCategory'>
      <div className='selectSubCategory'>  
          <span className ="spanOpacity"></span>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DemoContainer components={['TimePicker']}>
         <TimePicker
         label="Time"
         onChange={(e) => setTime(e)}
         />
        </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
    </div>

    <div className='cancel'>
    <button className='createcreate-btn' onClick={()=>navigate('/queries')}>Cancel</button>
    <button className='createcreate-btn' onClick={()=>handleCreate()}>Create</button>
    </div>
    </div>
    </Dashboard>
  )
}

export default CreateQuery