import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';
import Queries from './components/Queries';
import { useState } from 'react';
import Dashboard from './components/DashBoard';


export const url = 'http://localhost:2000';

function App() {

  let[data, setData] = useState([]);


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path = '/' element = {<Login/>}/>
      <Route path ='/users/adduser' element = {<Register/>}/>
      <Route path='/users/forgotpassword/:email' element = {<ForgotPassword/>}/>
      <Route path='/users/update-password/:randomString' element = {<NewPassword/>}/>
      <Route path='/queries' element = {<Queries/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
