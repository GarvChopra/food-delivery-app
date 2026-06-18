import React from 'react'
import { Link } from 'react-router-dom'

const AuthHome = () => {
  return (
    <main className="auth-shell home-shell">
      <section className="home-card">
        <div className="home-copy">
          <p className="eyebrow">Welcome to MealMate</p>
          <h1>Fast onboarding for users and food partners.</h1>
          <p className="home-description">
            Select the flow that best fits your role and get a polished, responsive sign-in experience optimized for mobile and desktop.
          </p>
        </div>

        <div className="home-grid">
          <article className="home-panel">
            <div>
              <h2>User access</h2>
              <p>Order meals, save favorites, and explore new menus with a simple user login.</p>
            </div>
            <div className="home-actions">
                  <Link className="button button-primary" to="/user/register">
                Register
              </Link>
              <Link className="button button-primary button-secondary" to="/user/login">
                Login
              </Link>
            </div>
          </article>

          <article className="home-panel">
            <div>
              <h2>Partner access</h2>
              <p>Manage your kitchen, menus, and availability with partner tools built for food businesses.</p>
            </div>
            <div className="home-actions">
              <Link className="button button-primary" to="/food-partner/register">
                Register
              </Link>
              <Link className="button button-primary button-secondary" to="/food-partner/login">
                Login
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

export default AuthHome
