import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setProductInCart } from "../../features/CartSlice";
import { setUser, User } from "../../features/userSlice";
import Footer from "../Navigation Bar/Footer";
import Header from "../Navigation Bar/Header";
import NoProduct from "../Error/NoProduct";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import CartProductCard from "../Cards/CartProductCard";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getCookie = async () => {
      const token = Cookies.get("user_token");
      if (token !== undefined) {
        try {
          const res = await axios.get("/users/check-user");
          dispatch(setUser(res.data));
          try {
            const res1 = await axios.get(`/cart/fetch-cart/${res.data.email}`);
            // console.log(res.data.cart);
            if(res1.data === null){
              dispatch(setProductInCart([]));
              setProducts([])
            }
            else{
              dispatch(setProductInCart(res1.data.cart));
              setProducts(res1.data.cart);
            }
          } catch (err) {
            console.log(err);
            navigate('/home')
          }
        } catch (err) {
					dispatch(setUser(null))
          navigate('/')
          console.log(err);
        }
      }
      else{
        navigate('/')
      }
    };

    getCookie();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = useSelector(User);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await axios.get(`/cart/fetch-cart/${user.email}`);
  //       dispatch(setProductInCart(res.data.cart));
  //       // console.log(res.data.cart);
  //       if(res.data.cart !== null){
  //         setProducts(res.data.cart);
  //       }
  //       else{
  //         setProducts([])
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchProducts();
  // }, [user]);

	let renderProductCard

	if(user === null || products === null){
		return(
      <div className="flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
        <img src="/images/loading.svg" alt="" className="h-80 w-80"/>
      </div>
    )
	}
	else if(products === []){
		return(
			<NoProduct/>
		)
	}
	else{
		renderProductCard = products.map((product, index)=>{
			return(
					<CartProductCard product = {product} key = {index}/>
			)
		})
	}

  if (products === null) {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-slate-100 flex justify-center items-center">
        <img src="/images/loading.svg" alt="" className="h-72 w-72 " />
      </div>
    );
  } else if (products.length === 0) {
    return <NoProduct/>;
  } else {
    return (
      <>
        <Header />
        <Container>
          <Title>
            <h1 className="font-extrabold">My Cart</h1>
          </Title>
          <ProductList>{renderProductCard}</ProductList>
        </Container>
        <Footer />
      </>
    );
  }
};

export default CartPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 100px 50px 50px 50px;
`;
const Title = styled.div`
  color: #140c40;
  font-size: 3rem;
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
