import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FlappyBird from './flappy-bird'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <FlappyBird/>
    </>
  )
}

export default App
