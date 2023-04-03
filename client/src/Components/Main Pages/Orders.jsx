import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser, User } from '../../features/userSlice'
import Footer from '../Navigation Bar/Footer'
import Header from '../Navigation Bar/Header'
import OrderCard from '../Cards/OrderCard'

const Orders = () => {

  const user = useSelector(User)
  const navigate = useNavigate()

  const [orders, setOrders] = useState(null)

  const dispatch = useDispatch()
  useEffect(()=>{
    const getCookie = async()=>{
      const token = Cookies.get('user_token')
      if(token !== undefined){
        try{
          const res = await axios.get('/users/check-user')
          dispatch(setUser(res.data))
          try{
            // console.log(res.data.email);
            const email = res.data.email
            const res2 = await axios.get(`/orders/fetch-orders/${email}`)
            // console.log(res2.data);  
            setOrders(res2.data)
          }
          catch(err){
            console.log(err);
          }
        }
        catch(err){
          dispatch(setUser(null))
          navigate('/home')
          console.log(err);
        }
      }
    }

    getCookie()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  if(user === null || orders === null){
    return(
      <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
        <img src="/images/loading.svg" alt="" className='h-80 w-80'/>
      </div>
    )
  }
  else{
    const renderOrder = orders.map((order, index)=>{
      return(
        <OrderCard order={order} key={index}/>
      )
    })
    return (
      <div>
        <Header/>
        <div className='py-40 text-dark-purple lg:px-28 px-7'>
          <h1 className='text-4xl text-center font-cinzel font-extrabold mb-5'>My Orders</h1>
          <div className='flex flex-col gap-10 items-center'>
            {renderOrder}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Orders

