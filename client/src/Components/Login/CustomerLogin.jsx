import React, { useState } from "react";
import axios from 'axios'
import { signInWithPopup} from "firebase/auth";
import {Link, useNavigate} from 'react-router-dom'
import LeftContainer from "./LeftContainer";
import { auth, provider } from "../Config/firebase";
import {setUser} from '../../features/userSlice'
import {useDispatch} from'react-redux'

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const google = async()=>{
    const msg = document.getElementById('msg')
    try{
      disable()
      const user = await  signInWithPopup(auth, provider);
      const res = await axios.post('/users/google-auth', user)
      dispatch(setUser(res.data))
      navigate('/home')
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

  const failed = ()=>{
    const msg = document.getElementById('msg')
    msg.innerText = "Invalid Credentials"
    msg.style.color = 'red'
  }


  const login = async(e)=>{
    e.preventDefault();
    try{
      disable()
      const res = await axios.post('/users/login', {email, password})
      dispatch(setUser(res.data))
      navigate('/home')
      success()
    }
    catch(err){
      console.log(err);
      failed()
    }
    finally{
      enable()
    }
  }

  return (
    <div className="flex w-screen h-full">
      <LeftContainer/>
      <div className="flex flex-col pt-28 items-center h-screen pb-6 justify-between w-full font-semibold font-montserrat">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-blue-600 text-5xl">Welcome To ECommerce</h1>
          <img src="/images/logo.png" alt="" className="h-28 w-28" />
          <h2 className="font-light text-3xl">Please Login</h2>
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
                <Link to='/' className='text-sm font-light text-blue-800'>Recover Password</Link>
              </div>
            </div>
            <button className="btn w-2/3 h-10 rounded-xl bg-blue-600 text-white text-lg focus:outline-none shadow-lg cursor-pointer disabled:brightness-75">Login</button>
          </form>
          <button className="g-btn flex gap-5 items-center justify-center btn w-2/3 h-10 rounded-xl bg-white text-lg focus:outline-none shadow-lg disabled:brightness-75" onClick={google}><img src="/images/google.svg" alt="" />Google</button>
        </div>
        <div className="flex flex-col items-center">
        <span className="text-sm font-light">New Member? <Link to='/customer-signup' className="text-blue-800">Sign up</Link></span>
        <Link to='/' className="text-sm font-light text-blue-800">Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
