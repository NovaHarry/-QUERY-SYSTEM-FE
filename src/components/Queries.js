import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { url } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';
import Dashboard from './DashBoard';
import Button from 'react-bootstrap/esm/Button';

const Queries = () => {

  let [data , setData] = useState([]);
  let navigate = useNavigate();
  let token = sessionStorage.getItem('token');
  let[query, setQuery] = useState("");


  let logout = ()=>{
    sessionStorage.clear();
    navigate('/');
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
      let res = await axios.get(`${url}/queries/queryID/${ID}`,{
      })
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

  const handleSolve = async()=>{
    // try {
    //   let res = await axios.get(`${url}/queries/queryID/${ID}`,{
    //   })
    //   toast.success(res.data.message);
    //   setQuery(res.data.queryID);
    // } catch (error) {
    //   if(error.response.status === 401 || error.response.status === 400)
    //   {
    //     toast.error(error.response.data.message);
    //   }
    //   console.log(error)
    // }
    if (window.confirm("Are you sure you want to close this query?")){
      var txt = "You pressed OK!";
    }
    else {
      txt = "You pressed Cancel!";
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
    <Dashboard title ="My Queries">
    <div className="main">
      <div className='create-query'>
        <button className='create-btn'>+ Create Query</button>
      </div>
      <div className='query-board'>
      <div className='queryGap'>
      <div className='all-queries'>
      {
            data.map((e,i)=>{
              return <div className="queries" key={e._id} onClick={()=>handleQuery(e.queryId)}>
                
                <div className='queryData' >
                <span className='queryTitle'>{e.queryId} - <span>{e.title}</span></span>
                {e.resolved == 'unresolved' ? <span className="resolved" style={{backgroundColor:"#d3f6ff",color:"#0082ac"}}>{e.resolved}</span> : <span style={{backgroundColor:"#d6ffe4" , color:"#06aa44"}}></span>}
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
        onClick={()=>handleSolve()}
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