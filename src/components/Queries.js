import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { url } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';
import Dashboard from './DashBoard';
import Button from 'react-bootstrap/esm/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
  

const Queries = () => {

  let [data , setData] = useState([]);
  let navigate = useNavigate();
  let token = sessionStorage.getItem('token');
  let[query, setQuery] = useState("");
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

  const handleLogins = async()=>{

    let loggedEmail = sessionStorage.getItem('loggedEmail');

    try{
      let res = await axios.get(`${url}/queries/${loggedEmail}`);
      toast.success(res.data.message);
      setData(res.data.querybyMail);
    }
    catch (error){
      toast.error(error.response.data.message);
      console.log(error);
    }
  }



  const handleQuery = async (ID)=>{
    try {
      let res = await axios.get(`${url}/queries/queryID/${ID}`)
      toast.success(res.data.message);
      setQuery(res.data.queryID);
    } catch (error) {
      if(error.response.status === 401 || error.response.status === 400)
      {
        toast.error(error.response.data.message);
      }
      console.log(error)
    }
  }

  const handleSolve = async(ID)=>{
    if (window.confirm("Are you sure you want to close this query?")){
        var solved = "You pressed OK!";
      if(solved == "You pressed OK!"){
        solved = "Resolved"
        try {
          let res = await axios.put(`${url}/queries/query-resolve/${ID}`)
          toast.success(res.data.message)
        } catch (error) {
          if(error.response.status === 401 || error.response.status === 400)
          {
            toast.error(error.response.data.message);
          }
          console.log(error)
        }
      }
    }
    else {
      solved = "You pressed Cancel!";
      
    }
}
  useEffect(()=>{
    if(token){
      handleLogins()
    }
    else{
      logout()
      sessionStorage.clear();
    }
  },[data])

  return (
    <Dashboard>
      <div className="nav-bar">
                <h1 className='nav-text'>My Queries</h1>
                <div className="profile">
                <span>{userNames}</span><AccountCircleIcon sx={{ fontSize: 60 }} className="icons" 
                onClick={()=>logout()}
                />
                </div>
      </div>
    <div className="main">
      <div className='create-query'>
        <button className='create-btn' onClick={()=>navigate('/queries/addquery')}>+ Create Query</button>
      </div>
      <div className='query-board'>
      <div className='queryGap'>
      <div className='all-queries'>
      {
            data.map((e,i)=>{
              return <div className="queries" key={e._id} onClick={()=>handleQuery(e.queryId)}>
                
                <div className='queryData' >
                <span className='queryTitle'>{e.queryId} - <span>{e.title}</span></span>
                {e.resolved == 'Unresolved' ? <span className="resolved" style={{backgroundColor:"#d3f6ff",color:"#0082ac"}}>{e.resolved}</span> : <span className="resolved" style={{backgroundColor:"#d6ffe4" , color:"#06aa44"}}>{e.resolved}</span>}
                </div>
                <div className='queryData'>
                <span className='category'>{e.category}</span>
                <span className='createdAt'>{e.createdAt}</span>
                </div>
              </div>
            })
          }
      </div>
      </div>

      <div className='open-queries'>

      {query ? 
      <div>
      <div className='openQuerytitle'>
      <span>{query.queryId} - {query.title}</span>
      </div>
      <hr/>
      <div className='assignedAll'>
      <div className='assigned'>
        <span className ="spanOpacity"> Created At:</span>
        <p>{query.createdAt}</p>
        </div>
        <div className='assigned'>
        <span className ="spanOpacity"> Assigned to:</span>
        <p>{query.assignedMentor}</p>
      </div>
      </div>
      <div className='assigned'>
        <span className ="spanOpacity"> Description</span>
        <p>{query.description}</p>
      </div>
      <div className='assignedAll'>
      <div className='assigned'>
        <span className ="spanOpacity"> Category:</span>
        <p>{query.category}</p>
        </div>
        <div className='assigned'>
        <span className ="spanOpacity"> Sub-Category:</span>
        <p>{query.subCategory}</p>
      </div>
      </div>
      <div className='assigned'>
        <span className ="spanOpacity"> Preferred Language</span>
        <p>{query.language}</p>
      </div>
      <div className='solved'>
        <Button variant="success"
        onClick={()=>handleSolve(query.queryId)}
        >Solved</Button>
      </div>
      
      </div>
      : ""}
      </div>
      </div>
    </div>
    </Dashboard>
  )
}

export default Queries;