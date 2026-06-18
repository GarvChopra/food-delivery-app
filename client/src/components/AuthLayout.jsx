import React from 'react'

const AuthLayout = ({ heading, description, children, asideLabel }) => {
  return (
    <div className="auth-shell">
      <div className="auth-grid">
        <aside className="auth-aside">
          <div className="brand-mark">MealMate</div>
          <div className="aside-copy">
            <span className="eyebrow">{asideLabel}</span>
            <h2>Clean onboarding for every kitchen and every customer.</h2>
            <p>
              A calm, polished sign in experience designed to feel seamless across desktop and mobile.
            </p>
          </div>
        </aside>

        <main className="auth-card">
          <div className="auth-header">
            <p className="eyebrow">{heading}</p>
            <h1>{description}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}

export default AuthLayout
