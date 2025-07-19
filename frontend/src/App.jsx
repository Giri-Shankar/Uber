import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import CaptainLogin from './pages/CaptainLogin'
import CaptainRegister from './pages/CaptainRegister'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users/login' element={<UserLogin />} />
        <Route path='/users/register' element={<UserRegister />} />
        <Route path='/captains/login' element={<CaptainLogin />} />
        <Route path='/captains/register' element={<CaptainRegister />} />
      </Routes>
    </div>
  )
}

export default App