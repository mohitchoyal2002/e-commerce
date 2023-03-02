import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ProductCard from './ProductCard';
import Fade  from 'react-reveal/Fade';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(true)
        axios({
            method:'GET',
            url: 'https://fakestoreapi.com/products?limit=8'
        }).then((res)=>{

            setData(res.data)
        }).catch(err=>console.log(err))
        .finally(()=>setLoading(false))
    }, [])

    const renderProductCard = data.map((product)=>{
        return(
            <Fade bottom><ProductCard product={product} key={product.id}/></Fade>
        )
    })

  return (
    <Wrap>
    <Container>
        {loading && <div id='load'></div>}
        {renderProductCard}
    </Container>
    <button className='x-btn' onClick={()=>navigate('/shop')}>Browse More</button>
    </Wrap>
  )
}

export default ProductList

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    padding: 0 200px;
    transition: 0.5s ease-in-out;

    .x-btn{
        transform: scaleY(1);
    }
`

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
    
    #load{
        height: 200px;
        width: 200px;
        background-image: url('/images/loading.svg');
        background-repeat: no-repeat;
        background-position: center;


    }
`

