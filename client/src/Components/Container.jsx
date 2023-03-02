import React from 'react'
import { Fade } from 'react-reveal'
import styled from 'styled-components'
import { Images } from '../features/CardSlice'
import {useSelector} from 'react-redux'
import Card from './Card'
import ProductList from './ProductList'


const Container = () => {

  const {images} = useSelector(Images)

    const renderCard = images.map((img, index)=>{
      return(<Fade bottom><Card img = {img} key = {index}/></Fade>)
    })
  
  return (
    <ContainerBody>
      <Wrap>
        {renderCard}
      </Wrap>
      <NewArrival>
        <h1 className='font-bold'>New<br/> Arrival</h1>
      </NewArrival>
      <ProductList/>
      <AboutContainer>
        <h1>
        collection houses our first-ever
        </h1>
        <button className='x-btn'>About Us</button>
      </AboutContainer>
      <Feature>
        <LeftSide>
          <Article>
          <h1 className='text-6xl font-montserrat font-bold'>Esteblish fact that by the readable content</h1>
          <button className="x-btn">read more</button>
          </Article>
        </LeftSide>
        <RightSide>
        <Article>
          <h1 className='text-6xl font-montserrat font-bold'>Esteblish fact that by the readable content</h1>
          <button className="x-btn">read more</button>
          </Article>
        </RightSide>
      </Feature>
      
    </ContainerBody>
  )
}

export default Container

const ContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Wrap = styled.div`
  padding: 0 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 50px;
  overflow: hidden;
  @media(max-width: 1240px){
    padding: 0;
    margin: 0;
  }
`

const NewArrival = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  // margin: 10px 100px;
  transition: 0.5s;
  h1{
    font-family: 'Cinzel Decorative', cursive;
    font-size: 4rem;
    color: #140C40;
    width: 100vw;
    margin: 50px;
  }
`

const AboutContainer = styled.div`
  width: 90%;
  height: 72vh;
  margin: 0 0 50px 0;
  // padding: 0 50px;
  background: url('/images/about-banner.webp');
  backgroud-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  text-align: center;

  h1{
    width: 70%;
    color: #fff;
    font-family: 'Cinzel', serif;
    font-size: 5rem;
    @media (max-width: 800px){
      font-size: 2.5rem;
    }
  }
  .x-btn{
    transform: scaleY(1);
    @media (max-width: 800px){
      width: 150px;
    }
  }

  &:hover .x-btn{
		// display: block;
		transform: scaleY(1);
	}
  
`

const Feature = styled.div`
  display: flex;
  gap: 20px;
  margin: 0 0 50px 0;
  // height: 70vh;
  @media (max-width: 800px){
    flex-direction: column;
    // height: 50vh;
  }
`

const LeftSide = styled.div`
  width: 45vw;
  height: 60vh;
  background: url('/images/home-feature.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;

  &:hover{
    transform: scale(1.02);
  }
`

const Article = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 50px 50px;
  h1{
    color: #fff;
    width: 50%;

    @media (max-width: 800px){
      width: 90%;
      font-size: 1.2rem;
    }
  }
  .x-btn{
    transform: scaleY(1);
    width: 200px;
    @media (max-width: 800px){
     width: 100px; 
    }
  }
`

const RightSide = styled.div`
  width: 45vw;
  height: 60vh;
  background: url('/images/home-feature-2.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;

  &:hover{
    transform: scale(1.02);
  }
`

