import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState({})


  const submitHandler = (e) => {
    e.preventDefault()
    setData({
      email: email,
      password: password
    })
    setEmail('')
    setPassword('')
  }

  return (
    <div className='px-6 py-1'>
      <img className='w-[40vw] mt-3 -ml-4' src="https://imgs.search.brave.com/GRjHPEbkAyBgc4m32QVpPBhFnBudDdRU3GHB1v6Dymw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/MTI3LzQ1MS9zbWFs/bC91YmVyLWxvZ28t/dWJlci1pY29uLXRy/YW5zcGFyZW50LWZy/ZWUtcG5nLnBuZw" alt="" />
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>
        <h3 className='text-xl font-semibold mb-2'>What's your email</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          placeholder='email@example.com'
          className='border-1 border-zinc-600 rounded-md px-5 py-1 w-full text-xl mb-4'
        />
        <h3 className='text-xl font-semibold mb-2'>Password</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          placeholder='password'
          className='border-1 border-zinc-600 rounded-md px-5 py-1 w-full text-xl mb-7'
        />
        <button className='bg-black text-white text-xl py-2 font-bold text-center w-full rounded-lg mb-2'>Login</button>
      </form>
      <div className='flex flex-col justify-between h-[45vh]'>
        <h2 className='w-full text-center font-bold'>New here? <Link to='/users/register' className='text-blue-800 underline'>Sign Up</Link></h2>
        <Link to='/captains/login' className='w-full bg-green-600 font-bold text-center text-xl text-zinc-900 rounded-lg py-2'>Login as Captain</Link>
      </div>

    </div>
  )
}

export default UserLogin