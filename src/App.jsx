import { useState } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { Route,Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import Dietdash from './pages/Dietdash';
import { useContext } from 'react';
import { TokenAuthContext } from './Context Api/AuthContext';





function App() {
  const {authStatus,setAuthStatus}=useContext(TokenAuthContext)


  return (
    <>
       
        <Routes>
        <Route path='/' Component={Landing}/>
        <Route path='/auth' Component={Auth}/>
        <Route path='/dash' element={authStatus?<Dashboard/>:<Landing/>}/>
        <Route path='/diet' element={authStatus?<Dietdash/>:<Landing/>}/>

        </Routes>

        <ToastContainer/>

      
    </>
  )
}

export default App

