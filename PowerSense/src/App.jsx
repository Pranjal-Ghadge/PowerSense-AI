import React, { useState } from 'react'
import Home from './Components/Home'
import Graph from './Components/Graph'

function App() {
  const [view, setView] = useState("HOME")

  return (
    <>
      {view === "HOME" && <Home setView={setView} />}
      {view === "GRAPH" && <Graph setView={setView} />}
    </>
  )
}

export default App
