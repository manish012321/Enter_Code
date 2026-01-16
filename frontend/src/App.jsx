import { SignInButton } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'

const App = () => {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books`)
      .then(res => res.json())
      .then(data => setBooks(data.msg))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h1>Welcome</h1>

      <SignInButton mode="modal">
        <button>Get Started</button>
      </SignInButton>

      <p>{books}</p>
    </>
  )
}

export default App