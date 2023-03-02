import React from 'react'
import styled from 'styled-components'
import Footer from './Footer'
import Header from './Header'

const NoProduct = () => {
  return (
    <>
    <Header/>
    <Container>
        <h1 className='font-extrabold'>No Product Added</h1>
    </Container>
    <Footer/>
    </>
  )
}

export default NoProduct

const Container = styled.div`
    height: 45vh;
    width: 100vw;
    margin: 100px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #140C40;
    font-size: 3rem;
    font-family: 'Cinzel Decorative',cursive;
`