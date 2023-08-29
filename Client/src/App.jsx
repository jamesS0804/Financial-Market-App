import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx';
import TraderDashboardPage from './pages/TraderDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [ authAlert, setAuthAlert ] = useState({status: '', message: ''})
  const [ isLoading, setIsLoading ] = useState(false)
  const [ auth, setAuth ] = useState(()=>{
    const session_auth = sessionStorage.getItem('authorization')
    session_auth ? session_auth : ""
  })
  const [ currentUserData, setCurrentUserData ] = useState({email: "", first_name: "", last_name: "", role: ""})
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
        <Route path="/dashboard/trader" element={<TraderDashboardPage />}/>
        <Route path="/dashboard/admin" element={<AdminDashboardPage />}/>
    </Routes>
  )
}

export default App
