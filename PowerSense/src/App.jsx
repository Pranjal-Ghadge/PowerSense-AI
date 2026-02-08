import React, { useState } from 'react'
import Home from './Components/Home'
import Graph from './Components/Graph'
import LoginRegister from './Components/LoginRegister'

function App() {
  const [view, setView] = useState("LOGIN")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    setView("HOME")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setView("LOGIN")
  }

  return (
    <>
      {!isAuthenticated ? (
        <LoginRegister setView={handleAuthSuccess} />
      ) : (
        <>
          {view === "HOME" && <Home setView={setView} onLogout={handleLogout} />}
          {view === "GRAPH" && <Graph setView={setView} onLogout={handleLogout} />}
        </>
      )}
    </>
  )
}

export default App
