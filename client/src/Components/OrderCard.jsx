import React from 'react'
import { AiFillStar } from 'react-icons/ai';

const OrderCard = (props) => {
  const {order} = props
  console.log(order);
  if(order.status === 'ordered'){
    return (
      <div className='flex justify-between w-4/5 border rounded-lg hover:shadow-md px-7 py-4'>
        <img src={order.product.image} alt="" className='w-36 h-40'/>
        <div className='flex flex-col font-montserrat gap-3'>
          <h1 className='text-xl font-bold '>{order.product.title}</h1>
          <span className='text-gray-400 font-semibold text-sm'>{order.product.category}</span>
          <span className='text-lg text-dark-purple font-semibold'>$ {order.product.price}</span> 
          <span className='text-base text-dark-purple font-semibold flex items-center gap-1 '>Rating: <AiFillStar className='text-lg text-yellow-400'/> {order.product.rating.rate}</span> 
        </div>
        <div className='flex items-center justify-center flex-col font-montserrat gap-3'>
          <span className='text-green-500 font-bold text-base'>{order.status}</span>
        </div>
      </div>
    )
  }
  else if(order.status === 'delivered'){
    return(
      <div className='flex justify-between w-4/5 border rounded-lg hover:shadow-lg px-7 py-4'>
        <img src={order.product.image} alt="" className='w-36 h-40'/>
        <div className='flex flex-col font-montserrat gap-3'>
          <h1 className='text-xl font-bold '>{order.product.title}</h1>  
          <span className='text-gray-400 font-semibold text-sm'>{order.product.category}</span>
          <span className='text-lg text-dark-purple font-semibold'>$ {order.product.price}</span> 
          <span className='flex items-center gap-1 text-base text-dark-purple font-semibold'>Rating: <AiFillStar className='text-lg text-yellow-400 '/> {order.product.rating.rate}</span> 
        </div>
        <div className='flex items-center justify-center flex-col font-montserrat gap-3'>
          <span className='text-green-500 font-bold text-base'>{order.status}</span>
        </div>
      </div>
    )
  }
}

export default OrderCard