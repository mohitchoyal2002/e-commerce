import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Fade from 'react-reveal/Fade'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Slider = () => {

  const navigate = useNavigate()

  return (
    <Wrap>
      <Fade bottom>
      <Carousel
        autoPlay
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
      >
        <InnerDiv1>
            <div className="text flex flex-col gap-5">
              <h1>FASHION</h1>
              <h1>CHANGING</h1>
              <h1>ALWAYS</h1>
            </div>
            <button className="x-btn" onClick={()=>{navigate('/shop')}}>Shop Now</button>
        </InnerDiv1>
        <InnerDiv2>
            <div className="text flex flex-col gap-5">
              <h1>FASHION</h1>
              <h1>CHANGING</h1>
              <h1>ALWAYS</h1>
            </div>
            <button className="x-btn" onClick={()=>{navigate('/shop')}}>Shop Now</button>
        </InnerDiv2>
        <InnerDiv3>
            <div className="text flex flex-col gap-5">
              <h1>FASHION</h1>
              <h1>CHANGING</h1>
              <h1>ALWAYS</h1>
            </div>
            <button className="x-btn" onClick={()=>{navigate('/shop')}}>Shop Now</button>
        </InnerDiv3>
      </Carousel>
      </Fade>
    </Wrap>
  )
}

export default Slider

const Wrap = styled.div`
  height: 91vh;

  margin: 100px 50px 100px 50px;
  @media (max-width: 1000px){
    margin: 0 20px 50px 20px;
  }
`;

const InnerDiv1 = styled.div`
  height: 95vh;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("/images/banner-image.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  h1 {
    color: #fff;
    font-size: 6.5rem;
    font-family: "Noto Serif Toto", serif;
    line-height: 60px;
    @media (max-width: 950px){
      font-size: 3.5rem;
    } 
  }
`;
const InnerDiv2 = styled.div`
  height: 95vh;
  background: url("/images/banner-image2.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  h1 {
    color: #fff;
    font-size: 6.5rem;
    font-family: "Noto Serif Toto", serif;
    line-height: 60px;
    @media (max-width: 950px){
      font-size: 3.5rem;
    } 
  }
   
`;
const InnerDiv3 = styled.div`
  height: 95vh;
  background: url("/images/banner-image3.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  h1 {
    color: #fff;
    font-size: 6.5rem;
    font-family: "Noto Serif Toto", serif;
    line-height: 60px;
    @media (max-width: 950px){
      font-size: 3.5rem;
    } 
  }
`;
