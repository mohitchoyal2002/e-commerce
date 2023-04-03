import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = (props) => {

	const navigate = useNavigate()
  const {img} = props
  const {url, name} = img
  return (
		<Container url = {url} name = {name} >
			<button className="x-btn" onClick={()=>navigate('/shop')}>Shop Now</button>
		</Container>
	);
};

export default Card;

const Container = styled.div`
	height: 500px;
	background: url('${props=>props.url}');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	width: 400px;
	margin: 5px 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 0.6s ease-in-out;
	.x-btn{
		transform: scaleY(0);
	}
	&:hover .x-btn{
		display: block;
		transform: scaleY(1);
	}
	&:after{
		content: "${props=>props.name}";
		height: 60px;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
		background: rgba(29,37,71,0.5);
		color: #fff;
		font-family: "Noto Serif Toto", serif;
		font-weight: 300;
		font-size: 2rem;
		transform: scaleY(0);
		transition: 0.4s ease-in-out;
	}
	&:hover:after{
		transform: scaleY(1);
	}
	@media(max-width: 1675px){
		width: 600px;
	}
	@media(max-width: 1240px){
		width: 500px;
	}
`;
