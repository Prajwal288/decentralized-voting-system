import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { Route, Routes } from 'react-router'
import Admin from './pages/Admin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
          <Route
            path="/"
            element={<Login />}
        />
        <Route
            path="/admin"
            element={<Admin />}
        />
        </Routes>
    </>
  )
}

export default App
