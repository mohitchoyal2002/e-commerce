import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { User } from '../../../features/userSlice'
import AdminLeftContainer from './AdminLeftContainer'
import axios from 'axios'

const SetDetail = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [shopName, setShopName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [password] = useState('googleAdminAuth')


  const user = useSelector(User)
  const navigate = useNavigate()

  const disable = ()=>{
    const btn = document.querySelector('.btn')

    btn.disabled = true;
  }

  const enable = ()=>{
    const btn = document.querySelector('.btn')
    btn.disabled = false;
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
  
  useEffect(()=>{
    if(user === null){
      navigate('/admin-login')
    }
    else{
      setName(user.name)
      setEmail(user.email)
    }
  }, [])

  const signup = async(e)=>{
    e.preventDefault()

    disable()
    try{
      const res = await axios.post('/admin/signup', {name: name, email, password, phoneNo,shopName})
      // console.log(res.data);
      success()
      navigate('/admin-login')
    }
    catch(err){
      failed(err.response.data)
    }
    finally{
      enable()
      setPhoneNo('')
      setShopName('')
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
          <h2 className="font-light text-3xl">Fill Few Detail Before You Go...  </h2>
          <span id="msg"></span>
          <form className="flex flex-col gap-5 items-center w-full" onSubmit={signup}>
            <div className="flex flex-col w-3/5">
              <span className="pl-2 text-sm font-normal">Shop Name*</span>
              <input 
                type="text"
                className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-full text-base font-medium focus:outline-none"
                placeholder="Shop Name"
                onChange={(e)=>{setShopName(e.target.value)}}
                value={shopName}
                required
              />
            </div>
            <div className="flex flex-col w-3/5">
              <span className="text-sm pl-2 font-normal">Phone No.</span>
              <input 
                type="text"
                className="border border-blue-600 rounded-lg text-gray-700 h-10 pl-4 width w-full text-base font-medium focus:outline-none"
                placeholder="Your Phone No."
                onChange={(e)=>{setPhoneNo(e.target.value)}}
                value={phoneNo}
                required
              />
            </div>
            <button className="btn disabled:brightness-75 disabled:cursor-not-allowed mt-4 h-10 rounded-xl w-80 bg-blue-600 text-white text-lg font">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SetDetail