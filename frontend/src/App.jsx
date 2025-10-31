import React from 'react'
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='auth/register' element={<Register/>}/>
        <Route path='auth/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App