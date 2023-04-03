import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Fade from 'react-reveal/Fade'
import axios from "axios";
import ProductCard from "../Cards/ProductCard";
import { useDispatch } from "react-redux";
import { setProducts } from "../../features/ProductSlice";
import Header from "../Navigation Bar/Header";
import Footer from "../Navigation Bar/Footer";

const ShopPage = () => {
  const [product, setProduct] = useState([]);
  const [load, setLoad] = useState(false);


  const dispatch = useDispatch()

  useEffect(() => {
    setLoad(true);
    axios({
      method: "GET",
      url: "https://fakestoreapi.com/products",
    })
      .then((res) => {
        dispatch(setProducts(res.data))
        setProduct(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoad(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProductCard = product.map((product) => {
    return (
      <Fade bottom>
        <ProductCard product={product} key={product.id} />
      </Fade>
    );
    // console.log(product);
  });
  return (
    <>
    <Header/>
    <Container>
      
      <Title>
        <h1 className="font-cinzel text-6xl font-extrabold">Shop With Us</h1>
      </Title>
      <ProductList>
      {load && <div id='load'></div>}
      {renderProductCard}
      </ProductList>
    </Container>
    <Footer/>
    </>
  );
};

export default ShopPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 100px 50px 50px 50px;
  @media(max-width: 600px){
    margin: 100px 0 0 0;
  }
`;
const Title = styled.div`
  color: #140c40;
  font-size: 2rem;
  font-family: "Cinzel Decorative", cursive;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 50px;
  padding: 0 200px;
  #load {
    height: 200px;
    width: 200px;
    background-image: url("/images/loading.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
`;
