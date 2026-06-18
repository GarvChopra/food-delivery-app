import React from 'react'
import AuthLayout from '../components/AuthLayout.jsx'
import TextInput from '../components/TextInput.jsx'
import Button from '../components/Button.jsx'

const FoodPartnerRegister = () => {
  return (
    <AuthLayout
      heading="Partner registration"
      description="Join as a food partner to manage menus, orders, and kitchen availability."
      asideLabel="Partner onboarding"
    >
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <TextInput label="Business name" id="partner-business-name" placeholder="Enter your business name" required />
        <TextInput label="Email address" id="partner-email" type="email" placeholder="partner@example.com" required />
        <TextInput label="Phone number" id="partner-phone" type="tel" placeholder="(555) 123-4567" required />
        <TextInput label="Password" id="partner-password" type="password" placeholder="Create a password" required />
        <Button type="submit" className="button-primary">
          Create partner account
        </Button>
      </form>
    </AuthLayout>
  )
}

export default FoodPartnerRegister
