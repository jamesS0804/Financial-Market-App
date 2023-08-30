import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx';
import TraderDashboardPage from './pages/Trader/TraderDashboardPage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [ authAlert, setAuthAlert ] = useState({status: '', message: ''})
  const [ isLoading, setIsLoading ] = useState(false)
  const [ auth, setAuth ] = useState(sessionStorage.getItem('authToken') ? sessionStorage.getItem('authToken') : "")
  const [ currentUserData, setCurrentUserData ] = useState(sessionStorage.getItem('current_user') ? JSON.parse(sessionStorage.getItem('current_user')) : {id: "", email: "", first_name: "", last_name: "", role: ""})
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const api = axios.create({
    baseURL: 'http://127.0.0.1:3000/'
  })
  const renderAlertVariant = () => {
      switch(authAlert.status) {
          case 'SUCCESS':
              return <Alert variant='success'>{authAlert.message}</Alert>;
          case 'ERROR':
              return <Alert variant='danger' >{authAlert.message}</Alert>;               
          case 'WARNING':
              return <Alert variant='warning'>{authAlert.message}</Alert>;
          default:
              return null;
      }
    }
  useEffect(()=> {
    if(auth){
      currentUserData.role === "TRADER" ?
        navigate("/dashboard/trader") : navigate("dashboard/admin")
    }
  }, [auth])
  useEffect(()=>{
    console.log(currentUserData)
  },[currentUserData])
  return (
    <Routes>
        <Route index path="/" element={
          <HomePage 
            api={api}
            emailRef={emailRef}
            passwordRef={passwordRef} 
            authAlert={authAlert}
            setAuthAlert={setAuthAlert}
            renderAlertVariant={renderAlertVariant}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            auth={auth}
            setAuth={setAuth}
            setCurrentUserData={setCurrentUserData}/>
        }/>
        <Route path="/signup" element={
          <SignupPage 
            api={api}
            emailRef={emailRef}
            passwordRef={passwordRef}
            authAlert={authAlert}
            setAuthAlert={setAuthAlert}
            renderAlertVariant={renderAlertVariant}
            isLoading={isLoading}
            setIsLoading={setIsLoading}/>
        }/>
        <Route path="/dashboard/trader" element={<TraderDashboardPage api={api} currentUserData={currentUserData}/>}/>
        <Route path="/dashboard/admin" element={<AdminDashboardPage api={api} currentUserData={currentUserData}/>}/>
    </Routes>
  )
}

export default App
