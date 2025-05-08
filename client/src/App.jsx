import React from 'react'
import LoginPage from './pages/LoginPage'
import MyProfilePage from './pages/MyProfilePage'
import DashBoardPage from './pages/DashBoardPage'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from './admin/AdminLayout'

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage  reg/>} />
      <Route element={<AdminLayout/>}>

      <Route path="/myprofile" element={<MyProfilePage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />
      </Route>
      
    </Routes>
      
    
  )
}

export default App
