import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12 sm:px-10">
      <div className="w-full max-w-3xl rounded-[2rem] border border-slate-700 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-sm">
        <div className="space-y-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Step 1</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Who are you?</h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-300">Choose your role to continue to the right experience.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            to="/user"
            className="inline-flex items-center justify-center rounded-3xl bg-slate-700 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-600"
          >
            I'm a User
          </Link>
          <Link
            to="/food-partner"
            className="inline-flex items-center justify-center rounded-3xl bg-slate-700 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-600"
          >
            I'm a Food Partner
          </Link>
        </div>
      </div>
    </main>
  )
}

export default LandingPage
