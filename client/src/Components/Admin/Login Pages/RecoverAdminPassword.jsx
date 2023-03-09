import React, { useState } from 'react'
import AdminLeftContainer from './AdminLeftContainer'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../features/userSlice'

const RecoverAdminPassword = () => {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const enable = ()=>{
    const btn = document.querySelector('.btn')
    btn.disabled = false;
    setEmail('')
    setName('')
  }

  const disable = ()=>{
    const btn = document.querySelector('.btn')
    btn.disabled = true;
  }

  const getOtp = async(e)=>{
    e.preventDefault()

    disable()

    try{
      const res = await axios.post('/admin/get-otp', {name, email})
      console.log(res.data);
      dispatch(setUser({name, email}))
      navigate('/otp-verification')
    }
    catch(err){
      console.log(err);
    }
    finally{
      enable()
    }
  }

  return (
    <div className='flex w-screen'>
      <AdminLeftContainer/>
      <Fade right>
      <div className="flex flex-col pt-28 items-center h-screen pb-6 justify-between w-full font-semibold font-montserrat">
        <div className="flex flex-col items-center gap-5 w-full px-10">
          <div className='text-center'>
            <h1 className="text-blue-600 text-5xl m-0">Welcome To ECommerce</h1>
            <h1 className="text-dark-purple text-xl m-0">Sell Product with your Price</h1>
          </div>
          <img src="/images/logo.png" alt="" className="h-28 w-28" />
          <h2 className="font-light text-3xl">Password Recovery</h2>
          <span id="msg"></span>
          <form className="flex flex-col gap-5 items-center w-full" onSubmit={getOtp}>
          <div className="flex flex-col w-3/5">
            <span className="pl-2 text-sm font-normal">Name*</span>
            <input 
              type="text"
              className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-full text-base font-medium focus:outline-none"
              placeholder="Your Name"
              onChange={(e)=>{setName(e.target.value)}}
              value={name}
              required
            />
          </div>
          <div className="flex flex-col w-3/5">
            <span className="text-sm pl-2 font-normal">Your Email*</span>
            <input 
              type="email"
              className="border border-blue-600 rounded-lg text-gray-700 h-10 pl-4 width w-full text-base font-medium focus:outline-none"
              placeholder="Your Email"
              onChange={(e)=>{setEmail(e.target.value)}}
              value={email}
              required
            />
          </div>
          <button className="btn disabled:brightness-75 disabled:cursor-not-allowed mt-4 h-10 rounded-xl w-80 bg-blue-600 text-white text-lg font">Get OTP</button>
        </form>
        </div>
      </div>
      </Fade>
    </div>
  )
}

export default RecoverAdminPassword