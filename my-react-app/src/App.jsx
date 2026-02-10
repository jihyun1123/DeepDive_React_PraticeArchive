import { useState } from 'react'
import Practice1 from './Practice1'
import Practice2 from './Practice2'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Practice1 />
      <Practice2 />
    </>
  )
}

export default App
