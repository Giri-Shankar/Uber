import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='bg-red-400 bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] w-full h-screen flex flex-col justify-between'>
            <img className='w-[40vw] mt-3 ml-1' src="https://imgs.search.brave.com/GRjHPEbkAyBgc4m32QVpPBhFnBudDdRU3GHB1v6Dymw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/MTI3LzQ1MS9zbWFs/bC91YmVyLWxvZ28t/dWJlci1pY29uLXRy/YW5zcGFyZW50LWZy/ZWUtcG5nLnBuZw" alt="" />
            <div className='bg-white px-5 py-3'>
                <h3 className='text-[8vw] font-semibold mb-2'>Get started with Uber</h3>
                <div className='bg-black rounded-lg flex items-center px-2 py-1'>
                    <Link to="/users/login" className='text-white w-[80vw] text-center font-semibold text-xl'>Continue</Link>
                    <img width="40" height="40" src="https://img.icons8.com/badges/48/long-arrow-right.png" alt="long-arrow-right"/>
                </div>
            </div>
        </div>
    )
}

export default Home