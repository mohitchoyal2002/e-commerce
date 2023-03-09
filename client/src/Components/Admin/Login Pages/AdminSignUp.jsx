import React, { useState } from 'react'
import AdminLeftContainer from './AdminLeftContainer'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../Config/firebase'
import { setUser } from '../../../features/userSlice'

const AdminSignUp = () => {

  const [userName, setUserName] = useState('')
  const [shopName, setShopName ] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [rePassword, setRePassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const disable = ()=>{
    const btn = document.querySelector('.btn')
    const gbtn = document.querySelector('.g-btn')

    btn.disabled = true;
    gbtn.disabled = true;
  }

  const enable = ()=>{
    const btn = document.querySelector('.btn')
    const gbtn = document.querySelector('.g-btn')
    btn.disabled = false;
    gbtn.disabled = false
  }

  const success = ()=>{
    const msg = document.getElementById('msg')
    msg.innerText = "You have been Registered"
    msg.style.color = 'green'
  }

  const failed = (err)=>{
    const msg = document.getElementById('msg')
    msg.innerText = err
    msg.style.color = 'red'
  }


  const checkPassword = (e)=>{
    const pass = e.target.value
    const error = document.getElementById('err')
    if(pass !== password){
      error.innerText = "Password doesn't match"
      disable()
    }
    else{
      error.innerText = ""
      enable()
    }
    setRePassword(pass)
  }

  const google = async()=>{
    const msg = document.getElementById('msg')
    try{
      disable()
      const user = await  signInWithPopup(auth, provider);
      const res = await axios.post('/admin/google-auth', user)
      if(res.data.msg === 'loggedIn'){
        dispatch(setUser(res.data.user))
        navigate('/admin-dashboard')
      }
      else{
        dispatch(setUser(res.data.user))
        navigate('/set-detail')
      }
    }
    catch(err){
      msg.innerText = "Try to enter email and Password"
      msg.style.color='red'
      console.log(err);
    }
    finally{
      enable()
    }
  }

  const signup = async(e)=>{
    e.preventDefault()

    disable()
    try{
      const res = await axios.post('/admin/signup', {name: userName, email, password, phoneNo,shopName})
      console.log(res.data);
      success()
    }
    catch(err){
      failed(err.response.data)
    }
    finally{
      enable()
      setEmail('')
      setPassword('')
      setPhoneNo('')
      setRePassword('')
      setShopName('')
      setUserName('')
    }
  }
  
  return (
    <div className='flex w-screen'>
      <AdminLeftContainer/>
      <div className="flex flex-col pt-28 items-center h-screen pb-6 justify-between w-full font-semibold font-montserrat">
        <div className="flex flex-col items-center gap-5 w-full px-10">
          <div className='text-center'>
            <h1 className="text-blue-600 text-5xl m-0">Welcome To ECommerce</h1>
            <h1 className="text-dark-purple text-xl m-0">Sell Product with your Price</h1>
          </div>
          <img src="/images/logo.png" alt="" className="h-28 w-28" />
          <h2 className="font-light text-3xl">Register Your Shop</h2>
          <span id="msg"></span>
          <form className="flex flex-wrap gap-5 justify-center" onSubmit={signup}>
            <div className="flex flex-col">
              <span className="pl-2 text-sm font-normal">Your Name*</span>
              <input 
                type="text"
                className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-80 text-base font-medium focus:outline-none"
                placeholder="Your Full Name"
                onChange={(e)=>{setUserName(e.target.value)}}
                value={userName}
                required
              />
            </div>
            <div className="flex flex-col">
              <span className="pl-2 text-sm font-normal">Shop Name*</span>
              <input 
                type="text"
                className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-80 text-base font-medium focus:outline-none"
                placeholder="Shop Name"
                onChange={(e)=>{setShopName(e.target.value)}}
                value={shopName}
                required
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm pl-2 font-normal">Email*</span>
              <input 
                type="email"
                className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-80 text-base font-medium focus:outline-none"
                placeholder="Your Email"
                onChange={(e)=>{setEmail(e.target.value)}}
                value={email}
                required
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm pl-2 font-normal">Phone No.</span>
              <input 
                type="text"
                className="border border-blue-600 rounded-lg text-gray-700 h-10 pl-4 width w-80 text-base font-medium focus:outline-none"
                placeholder="Your Phone No."
                onChange={(e)=>{setPhoneNo(e.target.value)}}
                value={phoneNo}
                required
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm pl-2 font-normal">Create Password*</span>
              <input 
                type="password"
                className="border border-blue-600 rounded-lg text-gray-700 h-10 pl-4 width w-80 text-base font-medium  focus:outline-none"
                placeholder="Your Password"
                onChange={(e)=>{setPassword(e.target.value)}}
                value={password}
                required
              />
            </div>
            <div className="flex flex-col">
              <span className="pl-2 text-sm font-normal">Confirm Password*</span>
              <input 
                type="password"
                className="border border-blue-600 rounded-lg h-10 text-gray-700 pl-4 width w-80 text-base font-medium focus:outline-none"
                placeholder="re-Enter Your Password Again"
                onChange={(e)=>{checkPassword(e)}}
                value={rePassword}
                required
              />
              <span id='err' className="pl-2 text-sm font-normal text-red-600"></span>
            </div>
            <button className="btn disabled:brightness-75 disabled:cursor-not-allowed mt-4 h-10 rounded-xl w-80 bg-blue-600 text-white text-lg font">Sign Up</button>
          </form>
          <button className="g-btn flex gap-5 items-center justify-center btn w-80 h-10 rounded-xl bg-white text-lg focus:outline-none shadow-lg cursor-pointer disabled:brightness-75" onClick={google}><img src="/images/google.svg" alt="" />Google</button>

        </div>
        <div className="flex flex-col items-center">
        <span className="text-sm font-light">Already a Member? <Link to='/admin-login' className="text-blue-800">Login</Link></span>
        <Link to='/' className="text-sm font-light text-blue-800">Customer Login</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminSignUp