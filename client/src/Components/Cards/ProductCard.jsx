import React from 'react'
import styled from 'styled-components'
import {BsBagDash, BsFillPersonFill} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import {add} from '../../features/CartSlice'
import { useNavigate } from 'react-router-dom';
import { setSelectedProduct } from '../../features/ProductSlice';
import axios from 'axios'
import { User } from '../../features/userSlice';

const ProductCard = (props) => {
    const {product} = props
    let title = product.title.substr(0,20);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(User)

    const addToCart = async()=>{
      
      try{
        const res = await axios.post('/cart/add-to-cart', {email: user.email, product})
        console.log(res.data);
        dispatch(add(product))
      }
      catch(err){
        console.log(err);
      }
    }

    const productDetail = ()=>{
      dispatch(setSelectedProduct(product))
      navigate('/product-detail')
    }

  return (
    <Container>
      <Icon>
        <Rating>
         ⭐ {product.rating.rate}
        </Rating>
        <Counting>
        <BsFillPersonFill className='text-gray-400'/>
         {product.rating.count}
        </Counting>
        <BsBagDash onClick={addToCart} className='cursor-pointer text-gray-400'/>
      </Icon>
        <Image>
          <img src={product.image} alt="" className='h-full w-full'/>
        </Image>
        <Title>
          <span onClick={productDetail} className='hover:underline' title={product.title}>{title}...</span>
        </Title>
        <Price>
          <span>Price: </span>
          <span>$ {product.price}</span>
        </Price>
    </Container>
  )
}

export default ProductCard
const Icon = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  transition: 0.3s ease-in-out
  opacity: 0;
  transform: scaleY(0);
`

const Container = styled.div`
  width: 350px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f5f8ff;
  cursor: pointer;

  &:hover ${Icon}{
    opacity: 1;
    transform: scaleY(1);
  }
  &:hover a{
    text-decoration: underline;
  }
`

const Image = styled.div`
  width: 250px;
  height: 300px;
  margin-bottom: 30px;
  transition: 0.4s ease-in-out;
  &:hover{
    transform: scale(1.03);
  }
`

const Title = styled.div`
  color: #140C40;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
  a{
    text-decoration: none;
  }
`


const Rating = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: #grey;
`
const Price = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #444444;
  font-size: 1.2rem;
  font-weight: 600;
`

const Counting = styled.div`
  
`