import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import {TbTruckDelivery} from 'react-icons/tb'
import {CgProfile} from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/userSlice'
import axios from 'axios'


const ProfileMenu = (props) => {
  const {user} = props
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const logout = async()=>{
    try{
      const res = await axios.get('/users/logout')
      console.log(res.data);
    }
    catch(err){
      console.log(err);
    }
    dispatch(setUser(null))
  }
  return (
    <div className='bg-white rounded-xl shadow-black drop-shadow-lg absolute top-10 right-1 z-50 p-5 w-96'>
      <div className='flex gap-5 justify-between mb-4'>
        <BsFillPersonFill className='text-5xl'/>
        <div className='flex flex-col gap-0'>
          <h1 className='text-2xl font-semibold m-0'>{user.firstName} {user.lastName}</h1>
          <span className='font-medium text-xs text-gray-500'>{user.email}</span>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
      <div className='flex gap-5 py-4 px-4 border items-center cursor-pointer' >
          <CgProfile className='text-blue-900 text-4xl'/>
          <div>
          <h1 className='text-xl font-semibold'>My Profile</h1>
            <span className='font-normal text-xs text-gray-500'>Account Setting</span>
          </div>
        </div>
        <div className='flex gap-5 py-6 px-4 border items-center cursor-pointer' onClick={()=>navigate('/orders')} >
          <TbTruckDelivery className='text-blue-900 text-4xl'/>
          <div>
          <h1 className='text-xl font-semibold'>MyOrders</h1>
          <span className='font-normal text-xs text-gray-500'>Track Order</span>
          </div>
        </div>
      </div>
      <button className='bg-blue-600 w-full h-10 rounded-lg text-white text-xl font-medium mt-4' onClick={logout}>Logout</button>
    </div>
  )
}

export default ProfileMenu