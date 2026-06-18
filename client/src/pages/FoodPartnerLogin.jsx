import React from 'react'
import AuthLayout from '../components/AuthLayout.jsx'
import TextInput from '../components/TextInput.jsx'
import Button from '../components/Button.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerLogin = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target["partner-login-email"].value
    const password = e.target["partner-login-password"].value
    await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    }, {
      withCredentials: true
    })
    navigate("/create-food")
    
  }
  return (
    <AuthLayout
      heading="Partner login"
      description="Sign in to manage your kitchen dashboard, menus, and food delivery availability."
      asideLabel="Partner sign in"
    >
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <TextInput label="Email address" id="partner-login-email" type="email" placeholder="partner@example.com" required />
        <TextInput label="Password" id="partner-login-password" type="password" placeholder="Enter your password" required />
        <Button type="submit" className="button-primary">
          Sign in as partner
        </Button>
        <p className="form-note">Styled consistently for both mobile and desktop layouts.</p>
      </form>
    </AuthLayout>
  )
}

export default FoodPartnerLogin
