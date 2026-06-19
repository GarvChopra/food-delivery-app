import React from 'react'
import AuthLayout from '../components/AuthLayout.jsx'
import TextInput from '../components/TextInput.jsx'
import Button from '../components/Button.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerRegister = () => {
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target["partner-business-name"].value
        const email = e.target["partner-email"].value
        const phone = e.target["partner-phone"].value
        const password = e.target["partner-password"].value

        axios.post("http://localhost:5000/api/auth/foodpartner/register", {
            name, email, phone, password
        }, {
            withCredentials: true
        }).then(res => {
            if (res.status === 201) {
                navigate(`/store/${res.data.partner.id}`)
            } else {
                console.log(res)
            }
        })
    }

    return (
        <AuthLayout
            heading="Partner registration"
            description="Join as a food partner to manage menus, orders, and kitchen availability."
            asideLabel="Partner onboarding"
        >
            <form className="auth-form" onSubmit={handleSubmit}>
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