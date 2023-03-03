import React from 'react'
import styled from 'styled-components'
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsPinterest } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';

const Footer = () => {
  return (
    <Container>
        <Contact>
          <h1 className='text-5xl font-montserrat font-bold'>E-Commerce</h1>
          <Icon>
              <AiOutlineTwitter  className='i text-xl'/>
              <BsFacebook className='i text-xl'/>
              <BsPinterest className='i text-xl'/>
          </Icon>
        </Contact>
        <Copy>
        <p>
        Copyright ©2023 All rights reserved | This template is made by
        </p>
        <span>
          Mohit
        </span>
        </Copy>
      </Container>
  )
}

export default Footer

const Container = styled.div`
  margin: 0 50px;
  height: 40vh;
  width: 92vw;
  background: #1D2547;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`

const Contact = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  flex-direction: column;
  color: #fff;
`

const Copy = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p{
    color: #fff;
  }
  span{
    margin-left: 5px;
    color: #9F78FF;
  }
`

const Icon = styled.div`
  display: flex;
  gap: 20px;
  .i{
    color: #fff;
    font-size: 2rem;
  }
  .i: hover{
    color: #007bff;
  }
`