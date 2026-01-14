import { SignInButton } from '@clerk/clerk-react'
import React from 'react'

const App = () => {
  return (
    <>
    <h1> welcome </h1>

    <SignInButton mode='modal'>
      <button>
        Get Started
      </button>
    </SignInButton>

    </>
  )
}

export default App
