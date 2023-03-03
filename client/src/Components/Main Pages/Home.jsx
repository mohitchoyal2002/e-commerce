import React, { useEffect, useState } from 'react'
import Slider from './Slider'
import Container from './Container'
import Footer from '../Navigation Bar/Footer'
import Header from '../Navigation Bar/Header'
import Cookies from'js-cookie'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/userSlice'
// import { setProducts } from '../features/ProductSlice'
import { setProductInCart } from '../../features/CartSlice'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const dispatch = useDispatch()
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await axios.get(`/cart/fetch-cart/${user.email}`);
  //       dispatch(setProductInCart(res.data.cart));
  //       // console.log(res.data.cart);
  //       setProducts(res.data.cart);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchProducts();
  // }, [user]);

  const [load, setLoad] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    const getCookie = async()=>{
      const token = Cookies.get('user_token')
      if(token !== undefined){
        try{
          const res = await axios.get('/users/check-user')
          dispatch(setUser(res.data))
          // console.log(res.data);
          const res2 = await axios.get(`/cart/fetch-cart/${res.data.email}`);
          
          // console.log(res2.data);
          if(res2.data !==null){
            dispatch(setProductInCart(res2.data.cart));
          }
        }
        catch(err){
          dispatch(setUser(null))
          navigate('/')
          console.log(err);
        }
        finally{
          setLoad(false)
        }
      }
      else{
        navigate('/')
      }
    }

    getCookie()
  }, [])

  if(load){
    return(
      <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
        <img src="/images/loading.svg" alt="" className='h-80 w-80' />
      </div>
    )
  }
  else{
    return (
      <div>
        <Header/>
        <Slider/>
        <Container/>
        <Footer/>
      </div>
    )
  }
}

export default Home