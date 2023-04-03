import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectedProduct } from '../../features/ProductSlice'
// import CustomerLogin from './CustomerLogin'
import ErrorPage from '../Error/ErrorPage'
import Footer from '../Navigation Bar/Footer'
import Header from '../Navigation Bar/Header'
import { AiFillStar } from 'react-icons/ai'
import axios from 'axios'
import Cookies from 'js-cookie'
import { setUser } from '../../features/userSlice'

const Checkout = () => {

  const [pincode, setPincode] = useState('')
  const [locality, setLocality] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [landmark, setLandmark] = useState('')
  const [user, setuser] = useState('')

  const navigate = useNavigate()
  const product = useSelector(selectedProduct)

  const dispatch = useDispatch()

  useEffect(()=>{
    const getCookie = async()=>{
      const token = Cookies.get('user_token')
      if(token !== undefined){
        try{
          const res = await axios.get('/users/check-user')
          dispatch(setUser(res.data))
          setuser(res.data)
        }
        catch(err){
          dispatch(setUser(null))
          console.log(err);
        }
      }
    }

    getCookie()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cancel = (e)=>{
    e.preventDefault();
    navigate('/product-detail')
  }

  const placeOrder = async(e)=>{
    const msg = document.getElementById('msg')
    e.preventDefault()
    try{
      await axios.put('/orders/place-order', {email: user.email, pincode, locality, address, city, state, landmark, product})
      msg.innerHTML = `Ordered Placed`
      navigate('/home')
    }
    catch(err){
      msg.style.color = 'red'
      msg.innerText = "Error: User Not Found"
      console.log(err);
    }
  }

  useEffect(()=>{
    if(product === null){
      navigate('/home')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if(product === null){
    return(
      <ErrorPage/>
    )
  }
  else{
    return (
      <div>
        <Header/>
        <div className='py-28 px-10 text-dark-purple font-montserrat flex flex-col gap-20'>
          <div className='flex items-center gap-14 justify-evenly'>
            <div className='w-52 h-56'>
              <img src={product.image} alt="" className='w-full h-full' />
            </div>
            <div className='flex flex-col'>
              <h1 className='text-2xl font-montserrat text-dark-purple font-semibold '>{product.title}</h1>
              <p><span className='p-1 rounded-md border border-custom-purple text-xs font-montserrat text-gray-400 font-bold'>{product.category}</span></p>
              <span className='mt-2 text-2xl font-bold'>$ {product.price}</span>
              <div className='flex flex-wrap'><p className='text-dark-purple font-medium text-sm font-montserrat mt-5'>{product.description}</p></div>
              <span className=' flex items-center gap-2 text-sm font-montserrat mt-6'>Rating: <AiFillStar className='text-lg text-yellow-400'/>{product.rating.rate}</span>
            </div>
          </div>
          <div className='flex flex-col pl-4 w-1/2'>
            <h1 className='text-2xl font-semibold mb-5'>Add Address:</h1>
            <form className='flex flex-wrap gap-10' onSubmit={placeOrder}>
              <div className="flex flex-col">
                <span className="pl-2 text-sm font-normal">Pincode*</span>
                <input 
                  type="text"
                  className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-80 text-base font-medium focus:outline-none"
                  placeholder="Pincode"
                  onChange={(e)=>{setPincode(e.target.value)}}
                  value={pincode}
                  required
                />
              </div>
              <div className="flex flex-col">
                <span className="pl-2 text-sm font-normal">Locality*</span>
                <input 
                  type="text"
                  className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-80 text-base font-medium focus:outline-none"
                  placeholder="Locality"
                  onChange={(e)=>{setLocality(e.target.value)}}
                  value={locality}
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <span className="pl-2 text-sm font-normal">Address*</span>
                <textarea 
                  type="text"
                  className="border border-blue-600 rounded-lg pl-4 text-gray-700 width w-1/2 h-28 text-base font-medium focus:outline-none resize-none"
                  placeholder="Locality"
                  onChange={(e)=>{setAddress(e.target.value)}} 
                  value={address}
                  required
                />
              </div>
              <div className="flex flex-col">
                <span className="pl-2 text-sm font-normal">City*</span>
                <input 
                  type="text"
                  className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-80 text-base font-medium focus:outline-none"
                  placeholder="City"
                  onChange={(e)=>{setCity(e.target.value)}}
                  value={city}
                  required
                />
              </div>
              <div className="flex flex-col">
                <span className="pl-2 text-sm font-normal">State*</span>
                <input 
                  type="text"
                  className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-80 text-base font-medium focus:outline-none"
                  placeholder="State"
                  onChange={(e)=>{setState(e.target.value)}}
                  value={state}
                  required
                />
              </div>
              <div className="flex flex-col">
                <span className="pl-2 text-sm font-normal">Landmark*</span>
                <input 
                  type="text"
                  className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-80 text-base font-medium focus:outline-none"
                  placeholder="Landmark"
                  onChange={(e)=>{setLandmark(e.target.value)}}
                  value={landmark}
                  required
                />
              </div>
              <span id='msg' className='text-green-600 text-xl font-montserrat font-medium'></span>
              <div className='flex  items-center gap-5 w-full'>
              <button className='flex items-center justify-center gap-2 bg-custom-purple py-3 px-5 text-white font-montserrat font-bold rounded-lg cursor-pointer' type='submit'>Place Order </button>
              <button className='flex items-center justify-center gap-2 bg-custom-purple py-3 px-5 text-white font-montserrat font-bold rounded-lg cursor-pointer' onClick={cancel}>Cancel </button>
              </div>
            </form>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Checkout