import React, { useEffect, useState } from 'react'
import LeftContainer from './LeftContainer'
import Fade from 'react-reveal/Fade'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { User } from '../../features/userSlice'
import axios from 'axios'

const ChangeCustomerPassword = () => {

  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const navigate = useNavigate()

  const user = useSelector(User)

  useEffect(()=>{
    if(user === null){
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkPassword = (e)=>{
    const pass = e.target.value
    const err = document.getElementById('err')

    if(pass !== password){
      err.innerText = "Password Dosen't Match!"
    }
    else{
      err.innerText = ""
    }

    setRePassword(pass)
  }

  const failed = (error)=>{
    const msg = document.querySelector('#msg')

    msg.innerText = error
  }

  const success = ()=>{
    const msg = document.querySelector('#msg')

    msg.innerText = "Password Has Been Changed"
  }

  const disable = ()=>{
    const btn = document.querySelector('.btn')
    btn.disabled = true
  }

  const enable = ()=>{
    const btn = document.querySelector('.btn')
    btn.disabled = false

    setPassword('')
    setRePassword('')
  }

  const updatePassword = async(e)=>{
    disable()
    e.preventDefault()
    try{
      await axios.put('/users/change-password', {email: user.email, password:rePassword})
      success()

      setTimeout(()=>{
        navigate('/')
      }, 1500)
    }
    catch(err){
      // console.log(err);
      failed(err.response.data)
    }
    finally{
      enable()
    }
  }

  return (
    <div className='flex w-screen'>
      <LeftContainer/>
      <Fade right>
      <div className="flex flex-col pt-28 items-center h-screen pb-6 justify-between w-full font-semibold font-montserrat">
        <div className="flex flex-col items-center gap-5 w-full px-10">
          <div className='text-center'>
            <h1 className="text-blue-600 text-5xl m-0">Welcome To ECommerce</h1>
            <h1 className="text-dark-purple text-xl m-0">Sell Product with your Price</h1>
          </div>
          <img src="/images/logo.png" alt="" className="h-28 w-28" />
          <h2 className="font-light text-3xl">Change Password</h2>
          <span id="msg"></span>
          <form className="flex flex-col gap-5 items-center w-full" onSubmit={updatePassword}>
          <div className="flex flex-col w-3/5">
            <span className="pl-2 text-sm font-normal">CHange Password*</span>
            <input 
              type="password"
              className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-full text-base font-medium focus:outline-none"
              placeholder="Create New Password"
              onChange={(e)=>{setPassword(e.target.value)}}
              value={password}
              required
            />
          </div>
          <div className="flex flex-col w-3/5">
            <span className="text-sm pl-2 font-normal">Confirm Password*</span>
            <input 
              type="text"
              className="border border-blue-600 rounded-lg text-gray-700 h-10 pl-4 width w-full text-base font-medium focus:outline-none"
              placeholder="Re-Enter Password"
              onChange={(e)=>{checkPassword(e)}}
              value={rePassword}
              required
            />
            <span id = 'err'className='text-red-600 font-extralight text-sm'></span>
          </div>
          <button className="btn disabled:brightness-75 disabled:cursor-not-allowed mt-4 h-10 rounded-xl w-80 bg-blue-600 text-white text-lg font">Change Password</button>
        </form>
        </div>
      </div>
      </Fade>
    </div>
  )
}

export default ChangeCustomerPassword