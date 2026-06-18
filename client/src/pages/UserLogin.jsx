import React from 'react'
import AuthLayout from '../components/AuthLayout.jsx'
import TextInput from '../components/TextInput.jsx'
import Button from '../components/Button.jsx'

const UserLogin = () => {
  return (
    <AuthLayout
      heading="User login"
      description="Access your meal dashboard, orders, and saved restaurants effortlessly."
      asideLabel="User sign in"
    >
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <TextInput label="Email address" id="user-login-email" type="email" placeholder="name@example.com" required />
        <TextInput label="Password" id="user-login-password" type="password" placeholder="Enter your password" required />
        <Button type="submit" className="button-primary">
          Sign in
        </Button>
        <p className="form-note">Designed to feel professional and approachable on every screen.</p>
      </form>
    </AuthLayout>
  )
}

export default UserLogin
