import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const UserRegister = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({})


  const submitHandler = (e) => {
    e.preventDefault()
    setCaptainData({
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password
    })
    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
  }


  return (
    <div className='px-6 py-1 min-h-screen'>
      <img className='w-[40vw] mt-3 -ml-4' src="https://imgs.search.brave.com/GRjHPEbkAyBgc4m32QVpPBhFnBudDdRU3GHB1v6Dymw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/MTI3LzQ1MS9zbWFs/bC91YmVyLWxvZ28t/dWJlci1pY29uLXRy/YW5zcGFyZW50LWZy/ZWUtcG5nLnBuZw" alt="" />
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>
        <h3 className='text-xl font-semibold mb-2'>What's your name</h3>
        <div className='flex gap-3'>
          <input
            type="text"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value)
            }}
            placeholder='Firstname'
            className='border-1 border-zinc-600 rounded-md px-5 py-1 w-full text-xl mb-4'
          />
          <input
            type="text"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value)
            }}
            placeholder='Lastname'
            className='border-1 border-zinc-600 rounded-md px-5 py-1 w-full text-xl mb-4'
          />
        </div>

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
        <button className='bg-black text-white text-xl py-2 font-bold text-center w-full rounded-lg mb-2'>Sign up</button>
      </form>
      <div className='flex flex-col justify-between h-[30vh]'>
        <h2 className='w-full text-center font-bold'>Already registered? <Link to='/users/login' className='text-blue-800 underline'>Log in</Link></h2>
        <h3 className='text-sm tracking-tighter leading-[4.8vw] opacity-60 text-justify'>
          By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.
        </h3>
      </div>


    </div>
  )
}

export default UserRegister