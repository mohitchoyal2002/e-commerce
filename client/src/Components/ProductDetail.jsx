import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectedProduct } from '../features/ProductSlice'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import {IoMdFlash} from 'react-icons/io'
import { BsCart } from 'react-icons/bs';
import Footer from './Footer';
import Header from './Header';
import { add } from '../features/CartSlice';
import axios from 'axios';
import { User } from '../features/userSlice';
import ErrorPage from './ErrorPage';

const ProductDetail = () => {
  const navigate = useNavigate()
  const product = useSelector(selectedProduct)
  useEffect(()=>{
    if(product === null){
      navigate('/home')
    }
  },[])
  // console.log(product);
  const dispatch = useDispatch()

  const user = useSelector(User)

  const buyItem = async()=>{
    try{
      const res = await axios.get('/users/check-user')
      navigate('/checkout')
    }
    catch(err){
      console.log(err);
      navigate('/')
    }
  }
  const addToCart = async()=>{
    try{
      try{
        const res1 = await axios.get('/users/check-user')
      }
      catch(err){
        navigate('/')
      }
      const res = await axios.post('/cart/add-to-cart', {email: user.email, product})
      console.log(res.data);
      dispatch(add(product))
    }
    catch(err){
      console.log(err);
    }
  }
  if(product === null){
    return (
      <ErrorPage/>
    )
  }
  return (
    <>
    <Header/>
    <Wrap>
        <MenuBar>
            <Links>
                <CustomLink to = '../home'className='font-semibold'>Home</CustomLink>
                <span> {'>'} </span>
                <CustomLink to = '/shop' className='font-semibold'>Shop</CustomLink>
                <span> {">"} </span>
                <CustomLink to = ''className='font-semibold'>Product Details</CustomLink>
            </Links>
        </MenuBar>
      <Container>
        <LeftContainer>
          <Discription>
            <h1>{product.title}</h1>
            <h2>Discription</h2>
            <p>{product.description}</p>
            <div className='flex gap-10 mt-5'>
              <button className='flex items-center justify-center gap-2 bg-custom-purple py-3 px-5 text-white font-montserrat font-bold rounded-lg cursor-pointer' onClick={buyItem}><IoMdFlash className='text-xl'/>Buy Now </button>
              <button className='flex items-center justify-center gap-2 bg-custom-purple py-3 px-5 text-white font-montserrat font-bold rounded-lg cursor-pointer' onClick={addToCart}><BsCart className='text-xl'/>Add To Cart</button>
            </div>
          </Discription>
        </LeftContainer>
        <RightContainer>
            <Image src={product.image}/>
            <Price>
            <h1>Price: </h1>
            <h1>${product.price}</h1>
            </Price>
        </RightContainer>
      </Container>
    </Wrap>
    <Footer/>
    </>
  );
};

export default ProductDetail;

const Wrap = styled.div`
    margin: 100px 50px;
    // height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content-center;
    font-family: 'Roboto', sans-serif;

`

const MenuBar = styled.div`
    background: #EFF5F8;
    margin: 50px;
    width: 93%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Links = styled.div`
    color: #949EA5;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600px;

`

const CustomLink = styled(Link)`
    color: #949EA5;
    font-family: 'Roboto', sans-serif;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600px;
    margin: 0 10px;
`

const Container = styled.div`
`;
const LeftContainer = styled.div`
  width: 60%;
  float: right;
  padding: 0 100px;
  @media(max-width: 1000px){
    width:90%;
    float: none;
    padding: 0;
  }
`;

const RightContainer = styled.div`
  width: 100%;
  margin-right: 60%;
  @media(max-width: 1000px){
    margin: 0;
  }
  
`;

const Image = styled.img`
    margin: 20px;
    height: 500px;
    @media(max-width: 1000px){
        height: 300px;
        width: 300px;
        margin: auto;
    }
`

const Price = styled.div`
    display: flex;
    justify-content: flex-start;
    h1{
        margin-right:10px; 
        color: #140c40;
    }
`

const Discription = styled.div`
    color: #140c40;
    h1{
        margin-bottom: 50px;
    }
    h2 {
        font-size: 1.3rem;
        letter-spacing: 1px;
        font-size:
    }
  p{
    padding: 10px 50px;
    font-size: 1rem;
    letter-spacing: 1px;
    @media(max-width: 900px){
     padding: 0;       
    }
  }
`;
