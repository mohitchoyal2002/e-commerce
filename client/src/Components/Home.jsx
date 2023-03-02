import React, { useEffect } from 'react'
import Slider from '../Components/Slider'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'
import Cookies from'js-cookie'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/userSlice'

const Home = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    const getCookie = async()=>{
      const token = Cookies.get('user_token')
      if(token !== undefined){
        try{
          const res = await axios.get('/users/check-user')
          dispatch(setUser(res.data))
        }
        catch(err){
          dispatch(setUser(null))
          console.log(err);
        }
      }
    }

    getCookie()
  }, [])

  return (
    <div>
      <Header/>
      <Slider/>
      <Container/>
      <Footer/>
    </div>
  )
}

export default Home