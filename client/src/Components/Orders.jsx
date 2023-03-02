import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { setUser, User } from '../features/userSlice'
import Footer from './Footer'
import Header from './Header'

const Orders = () => {

  const user = useSelector(User)
  const navigate = useNavigate()


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
            console.log(res2.data);
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
  }, [])



  if(user === null){
    return(
      <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
        <img src="/images/loading.svg" alt="" className='h-80 w-80'/>
      </div>
    )
  }
  else{
    return (
      <div>
        <Header/>
        <Container>

        </Container>
        <Footer/>
      </div>
    )
  }
}

export default Orders

const Container = styled.div`
  
`