import React, { useState } from 'react'
import AdminLeftContainer from './AdminLeftContainer'
import { auth, provider } from "../../Config/firebase";
import { signInWithPopup} from "firebase/auth";
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../features/userSlice';

const AdminLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const disable = ()=>{
    const btn = document.querySelector('.btn')
    const gbtn = document.querySelector('.g-btn')

    btn.disabled = true;
    gbtn.disabled = true;
  }

  const enable = ()=>{
    setEmail('')
    setPassword('')
    const btn = document.querySelector('.btn')
    const gbtn = document.querySelector('.g-btn')
    btn.disabled = false;
    gbtn.disabled = false
  }

  const success = ()=>{
    const msg = document.getElementById('msg')
    msg.innerText = "Logged In"
    msg.style.color = 'green'
  }

  const failed = (err)=>{
    const msg = document.getElementById('msg')
    msg.innerText = err
    msg.style.color = 'red'
  }


  const login = async(e)=>{
    e.preventDefault()
    disable()
    try{
      const res = await axios.post('/admin/login', {email, password})
      dispatch(setUser(res.data))
      success()
      navigate('/admin-dashboard')
    }
    catch(err){
      // console.log(err);
      failed(err.response.data)
    }
    finally{
      enable()
    }
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

  return (
    <div className='flex w-screen'>
      <AdminLeftContainer/>
      <div className="flex flex-col pt-28 items-center h-screen pb-6 justify-between w-full font-semibold font-montserrat">
        <div className="flex flex-col items-center gap-5">
          <div className='text-center'>
            <h1 className="text-blue-600 text-5xl m-0">Welcome To ECommerce Seller</h1>
            <h1 className="text-dark-purple text-xl m-0">Sell Product with your price</h1>
          </div>
          <img src="/images/logo.png" alt="" className="h-28 w-28" />
          <h2 className="font-light text-3xl">Admin Login</h2>
          <span id="msg"></span> 
          <form className="flex flex-col gap-5 w-full items-center" onSubmit={login}>
            <input 
            type="email"
            className="border border-blue-600 rounded-lg h-10 pl-4 width w-2/3 text-lg text-gray-700 focus:outline-none"
            placeholder="Email"
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}
            />
            <input 
            type="password"
            className="border border-blue-600 rounded-lg h-10 pl-4 width w-2/3 text-lg text-gray-700 focus:outline-none"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            autoComplete='disable'
            />
            <div className="w-2/3 flex items-center justify-between">
              <div className="flex items-center gap-1">
              <input 
              type="checkbox"
              onChange={()=>setIsChecked(!isChecked)}
              checked = {isChecked}
              />
              <span className="text-sm font-extralight">remember me</span>
              </div>
              <div>
                <Link to='/recover-admin-password' className='text-sm font-light text-blue-800'>Recover Password</Link>
              </div>
            </div>
            <button className="btn w-2/3 h-10 rounded-xl bg-blue-600 text-white text-lg focus:outline-none shadow-lg cursor-pointer disabled:brightness-75">Login</button>
          </form>
          <button className="g-btn flex gap-5 items-center justify-center btn w-2/3 h-10 rounded-xl bg-white text-lg focus:outline-none shadow-lg disabled:brightness-75" onClick={google}><img src="/images/google.svg" alt="" />Google</button>
        </div>
        <div className="flex flex-col items-center">
        <span className="text-sm font-light">New Seller? <Link to='/admin-signup' className="text-blue-800">Sign up</Link></span>
        <Link to='/' className="text-sm font-light text-blue-800">Customer Login</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin