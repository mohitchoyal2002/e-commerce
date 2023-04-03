import React from 'react'
import { BsPersonFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, User } from '../../../features/userSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminProfileBanner = () => {

  const user = useSelector(User)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = async()=>{
    try{
      await axios.get('/admin/logout')
      dispatch(setUser(null));
      navigate('/admin-login')
    }
    catch(err){

    }
  }

  return (
    <div className='absolute top-0 right-4 shadow-lg rounded-2xl'>
      <div className='bg-gray-50 p-5'>
        <div className='flex items-center gap-32'>
          <BsPersonFill fontSize={40} className='text-gray-600'/>
          <div className='mb-4'>
            <h1 className='text-2xl font-bold text-gray-600'>{user.name}</h1>
            <span className='text-sm font-bold text-gray-600'>{user.email}</span>
          </div>
        </div>
        <div className='w-full rounded-lg p-2 flex items-center justify-center hover:bg-gray-200 cursor-pointer' onClick={()=>{
          navigate('admin-profile')
          }}>
          {/* <BsPersonCircle className='text-custom-purple' fontSize={30}/> */}
          <h2 className='text-gray-600 text-xl font-bold'>My Profile</h2>
        </div>
        <button className='bg-custom-purple text-white font-bold text-xl py-1 m-2 mt-4 w-full rounded-lg' onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default AdminProfileBanner