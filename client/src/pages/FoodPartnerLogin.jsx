import React from 'react'
import AuthLayout from '../components/AuthLayout.jsx'
import TextInput from '../components/TextInput.jsx'
import Button from '../components/Button.jsx'

const FoodPartnerLogin = () => {
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
