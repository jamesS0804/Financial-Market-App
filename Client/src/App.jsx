import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx';
import TraderDashboardPage from './pages/TraderDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';

function App() {
  const [ authAlert,setAuthAlert ] = useState({status: '', message: ''})
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
  return (
    <Routes>
        <Route index path="/" element={<HomePage />}/>
        <Route path="/login" element={
          <LoginPage 
            authAlert={authAlert}
            setAuthAlert={setAuthAlert}
            renderAlertVariant={renderAlertVariant}/>
        }/>
        <Route path="/signup" element={
          <SignupPage 
            authAlert={authAlert}
            setAuthAlert={setAuthAlert}
            renderAlertVariant={renderAlertVariant}/>
        }/>
        <Route path="/dashboard/trader" element={<TraderDashboardPage />}/>
        <Route path="/dashboard/admin" element={<AdminDashboardPage />}/>
    </Routes>
  )
}

export default App
