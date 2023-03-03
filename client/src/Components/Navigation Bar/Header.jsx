import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate} from 'react-router-dom'
import {AiOutlineTwitter} from 'react-icons/ai'
import {BsFacebook, BsFillPersonFill} from 'react-icons/bs'
import {BsPinterest} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsBagDash} from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import { Products } from "../../features/CartSlice";
import {User} from '../../features/userSlice'
import {RiArrowDropDownFill} from 'react-icons/ri'
import ProfileMenu from "./ProfileMenu";
import {profile, setProfile} from '../../features/profileSlice'
import Fade  from "react-reveal/Fade";



const Header = () => {

  const cart = useSelector(Products);
  const num = cart.length;
  const navigate = useNavigate();

  const user = useSelector(User);
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(useSelector(profile))

  const open = ()=>{
    setIsOpen(!isOpen)
    dispatch(setProfile(isOpen))
  }
  

  return (
    <Nav>
      <Link to='/home'><Logo src="/images/logo.png" /></Link>
      <Menu>
        <Link to="/home">home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="">About</Link>
        <Link to="">Blog</Link>
        <Link to="">contact</Link>
      </Menu>
      <RightMenu>
        <div className="socials">
          <div className="icon">
            <AiOutlineTwitter className="i text-xl" fontSize="small" />
          </div>
          <div className="icon">
            <BsFacebook className="i text-xl" fontSize="small" />
          </div>
          <div className="icon">
            <BsPinterest className="i text-xl" fontSize="small" />
          </div>
        </div>
        <SearchDiv>
					<AiOutlineSearch/>
				</SearchDiv>
				<CartDiv onClick={()=>navigate('/cart')}>
					<BsBagDash/>
					<span>{num}</span>
				</CartDiv>
        {
          user?<div>
            <Profile>
              <div className="flex items-center gap-5 ml-5 cursor-pointer bg-gray-100 p-2 rounded-lg"onClick={open}>
                <div>
                  <BsFillPersonFill className="text-gray-400 text-2xl"/>
                </div>
                <Info className="flex flex-col gap-4">
                  <span className="text-base text-gray-600">Hii, <span className="font-semibold text-gray-400">{user.firstName + ' '+ user.lastName}</span></span>
                </Info>
                <RiArrowDropDownFill className="text-xl"/>
              </div>
              {
                isOpen?<Fade bottom ><ProfileMenu user={user}/></Fade>:<div className="w-0 h-0"></div>
              }
            </Profile>
          </div>:<div>
            <Profile className="p-3 rounded-lg bg-gray-200 ml-4">
              <span className="text-sm font-montserrat font-semibold text-gray-600"><Link to='/'>Sign In</Link></span>
            </Profile>
          </div>
        }
      </RightMenu>
    </Nav>
  );
};

export default Header;

const Nav = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
  background: #fff;
  z-index: 1000;
  position: fixed;
  top: 0;
  @media (max-width: 950px){
    justify-content: space-between;
  }
`;

const Logo = styled.img`
  margin: 5px 50px;
  margin-right: 100px;
  width: 90px;
  height: 90px;
  @media (max-width: 600px){
    width: 40px;
    height: 40px;
    margin: 5px 20px;
  }
`;

const Menu = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  a {
    font-family: "Roboto", sans-serif;
    letter-spacing: 1px;
    margin-right: 20px;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.9rem;
    text-decoration: none;
    color: #1d2547;
  }
  a:hover {
    color: #6610f2;
  }

  @media (max-width: 950px){
    flex:0;
    display: none;
  }
`;

const RightMenu = styled.div`
  color: #1d2547;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
  .socials {
    display: flex;
    align-items: center;
    margin-right: 20px;
    @media (max-width: 600px){
      display: none;
    }
  }
  .icon {
    height: 40px;
    width: 40px;
    border: 1px solid #979797;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    // align-items: center;
    // font-size: 0.3rem;
    margin: 0 7px;
		cursor: pointer;
    .i {
      transition: 0.4s ease-in-out;
    }
  }
  .icon:hover {
    .i {
      transition: 0.5s ease-in-out;
      transform: scaleX(-1);
    }
  }

`;

const SearchDiv = styled.div`
	height: 40px;
	width: 40px;
	background: rgb(247, 247, 247);
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	margin-right: 12px;
  @media (max-width: 600px){
    height: 20px;
    width: 20px;
  }
`;

const CartDiv = styled.div`
  
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	height: 40px;
	width: 80px;
	background: #9F78FF;
	border-radius: 40px;
	color: #fff;
	cursor: pointer;
	span{
		font-size: 1.2rem;
	}
  @media (max-width: 600px){
    height: 30px;
    width: 60px;
  }
`

const Profile = styled.div`
  display: flex;
  flex-direction: column;
`
const Info = styled.div`

`