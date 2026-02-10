import { useState } from 'react'
import Practice1 from './Practice1'
import Practice2 from './Practice2'
import Practice3 from './Practice3'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Practice1 />
      <Practice2 />
      <Practice3 />
    </>
  )
}

export default App
