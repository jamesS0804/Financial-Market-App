import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
        <Route index path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/dashboard" elemet={<DashboardPage />}/>
    </Routes>
  )
}

export default App
