import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UserRegister from '../pages/UserRegister.jsx'
import UserLogin from '../pages/UserLogin.jsx'
import FoodPartnerRegister from '../pages/FoodPartnerRegister.jsx'
import FoodPartnerLogin from '../pages/FoodPartnerLogin.jsx'
import AuthHome from '../pages/AuthHome.jsx'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthHome />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/create-food" element={<CreateFood/>}/>
      </Routes>
    </Router>
  )
}

export default AppRoutes
