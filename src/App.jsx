import { useState } from 'react'
import reactLogo from './assets/react.svg'
import lexLogo from '/logo.svg'
import './App.css'
import Navigation from './AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigation />
    </>
  )
}

export default App
