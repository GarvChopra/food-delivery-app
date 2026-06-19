import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UserRegister from '../pages/UserRegister.jsx'
import UserLogin from '../pages/UserLogin.jsx'
import FoodPartnerRegister from '../pages/FoodPartnerRegister.jsx'
import FoodPartnerLogin from '../pages/FoodPartnerLogin.jsx'
import LandingPage from '../pages/LandingPage.jsx'
import UserChoice from '../pages/UserChoice.jsx'
import PartnerChoice from '../pages/PartnerChoice.jsx'
import Home from '../pages/Home.jsx'
import Store from '../pages/Store.jsx'
import CreateFood from '../food-partner/CreateFood.jsx'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserChoice />} />
        <Route path="/food-partner" element={<PartnerChoice />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/store/:partnerId" element={<Store />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes