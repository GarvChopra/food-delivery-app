import React from 'react'
import AuthLayout from '../components/AuthLayout.jsx'
import TextInput from '../components/TextInput.jsx'
import Button from '../components/Button.jsx'

const UserRegister = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = e.target.name.value;
        const email = e.target.email.value;
        const address = e.target.address.value;
        const password = e.target.password.value;

        axios.post("http://localhost:5000/api/users", { name, email, address, password
            
         })
    }
  return (
    <AuthLayout
      heading="User registration"
      description="Create your account to order meals, save favorites, and browse new menus."
      asideLabel="User onboarding"
    >
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <TextInput label="Full name" id="user-fullname" placeholder="Enter your full name" required />
        <TextInput label="Email address" id="user-email" type="email" placeholder="name@example.com" required />
        <TextInput label="Address" id="user-address" placeholder="Enter your address" required />
        <TextInput label="Password" id="user-password" type="password" placeholder="Create a password" required />
        <Button type="submit" onClick={handleSubmit} className="button-primary">
          Create account
        </Button>
        <p className="form-note">No payment info needed. This page is a frontend UI mockup only.</p>
      </form>
    </AuthLayout>
  )
}

export default UserRegister
