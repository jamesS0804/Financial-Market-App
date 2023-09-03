import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import LandingPage from './pages/LandingPage/LandingPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import Dashboard from './pages/Dashboard/Dashboard'
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';

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
              return <Alert variant='success' style={{textAlign: "center"}}>{authAlert.message}</Alert>;
          case 'ERROR':
              return <Alert variant='danger' className='d-flex flex-column gap-2' style={{textAlign: "center"}}>
                        {
                            authAlert.message instanceof Array ?
                            authAlert.message.map((message, index) => (
                              <div key={index}>{message}</div>
                            ))
                              : <div>{authAlert.message}</div>
                        }
                      </Alert>;               
          case 'WARNING':
              return <Alert variant='warning'style={{textAlign: "center"}}>{authAlert.message}</Alert>;
          default:
              return null;
      }
    }
  useEffect(()=> {
    if(auth){
      currentUserData.role === "TRADER" ?
        navigate("/dashboard/trader") : navigate("dashboard/admin")
    } else {
      navigate("/")
    }
  }, [currentUserData])
  useEffect(()=>{
    console.log(currentUserData)
  },[currentUserData])
  return (
    <Routes>
        <Route index path="/" element={
          <LandingPage 
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
          <SignUpPage 
            api={api}
            emailRef={emailRef}
            passwordRef={passwordRef}
            authAlert={authAlert}
            setAuthAlert={setAuthAlert}
            renderAlertVariant={renderAlertVariant}
            isLoading={isLoading}
            setIsLoading={setIsLoading}/>
        }/>
        <Route path="/dashboard/trader" element={<Dashboard
          api={api} 
          currentUserData={currentUserData}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          setAuthAlert={setAuthAlert}
          renderAlertVariant={renderAlertVariant}
          authAlert={authAlert}
        />}/>
        <Route path="/dashboard/admin" element={<AdminDashboardPage 
          setIsLoading={setIsLoading}
          setAuthAlert={setAuthAlert}
          renderAlertVariant={renderAlertVariant}
          authAlert={authAlert}
          isLoading={isLoading}
        />}/>
    </Routes>
  )
}

export default App
