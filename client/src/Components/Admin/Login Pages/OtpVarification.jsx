import React, { useEffect, useState } from 'react'
import AdminLeftContainer from './AdminLeftContainer'
import Fade from 'react-reveal/Fade'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { User } from '../../../features/userSlice'
import { useNavigate } from 'react-router-dom'

const OtpVarification = () => {

  const [otp, setOtp] = useState('')

  const user = useSelector(User)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user === null){
      navigate('/admin-login')
    }
    else{
      // console.log(user);
    }
  }, [])

  const failed = (err)=>{
    const msg = document.getElementById('msg')
    msg.innerText = err
  }

  const enable = ()=>{
    const btn = document.querySelector('.btn')
    btn.disabled = false;
  }

  const disable = ()=>{
    const btn = document.querySelector('.btn')
    btn.disabled = false;
  }


  const verifyOtp = async(e)=>{
    e.preventDefault()
    disable()
    
    try{
      const res = await axios.put('/admin/verify-otp',{email: user.email, otp: otp})
      navigate('/change-password')
    }
    catch(err){
      failed(err.response.data)
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
          <h2 className="font-light text-3xl">OTP Verification</h2>
          <span id="msg" className='text-red-600'></span>
          <form className="flex flex-col gap-5 items-center w-full" onSubmit={verifyOtp}>
          <div className="flex flex-col w-3/5">
            <span className="pl-2 text-sm font-normal">OTP*</span>
            <input 
              type="text"
              className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-full text-base font-medium focus:outline-none"
              placeholder="Enter OTP"
              onChange={(e)=>{setOtp(e.target.value)}}
              value={otp}
              required
            />
          </div>
          <button className="btn disabled:brightness-75 disabled:cursor-not-allowed mt-4 h-10 rounded-xl w-80 bg-blue-600 text-white text-lg font">Verify OTP</button>
        </form>
        </div>
      </div>
      </Fade>
    </div>
  )
}

export default OtpVarification