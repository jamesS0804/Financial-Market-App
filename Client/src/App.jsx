import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx';
import TraderDashboardPage from './pages/TraderDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <Routes>
        <Route index path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/dashboard/trader" element={<TraderDashboardPage />}/>
        <Route path="/dashboard/admin" element={<AdminDashboardPage />}/>
    </Routes>
  )
}

export default App
