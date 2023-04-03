import React, { useState } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import Badge from '@mui/material/Badge';
import { BsChatLeft, BsFillPersonFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import {useSelector, useDispatch} from 'react-redux'
import {User} from '../../../features/userSlice'
import {profile, setProfile} from '../../../features/profileSlice'
import AdminProfileBanner from "../Admin Profile/AdminProfileBanner";

const Header = () => {
  const user = useSelector(User)

  const [isOpen, setIsOpen] = useState(useSelector(profile))

  const dispatch = useDispatch()

  const open = ()=>{
    setIsOpen(!isOpen)
    dispatch(setProfile(isOpen))
  }

  return (
    <div className="w-full bg-white font-nunito font-medium border-b border-gray-200">
      <div className="w-full flex justify-between items-center px-3 py-4 pr-8">
        <div className="bg-transparent border border-gray-200 h-8 rounded hidden items-center gap-5 lg:flex">
          <input
            type="text"
            placeholder="search..."
            className="border-none pl-2 outline-none bg-transparent h-full w-full m-0 placeholder:text-base text-gray-500"
          />
          <span className="p-1 cursor-pointer hover:bg-gray-200">
          <AiOutlineSearch fontSize={20} className='text-custom-purple font-bold cursor-pointer'/>
          </span>
        </div>
        <div className="flex items-center">
          <h2 className="font-bold text-xl text-custom-purple lg:text-xl md:text-xl">
            <span className="hidden lg:inline-block md:inline-block">Admin</span> Dashboard
          </h2>
        </div>
        <div className="flex gap-5 items-center">
          <Badge badgeContent={2} color="error" className="cursor-pointer">
            <MdOutlineNotificationsNone
              fontSize={22}
              className="text-gray-500"
            />
          </Badge>
          <Badge badgeContent={4} color="error" className="cursor-pointer">
            <BsChatLeft
              fontSize={20}
              className="text-gray-500"
            />
          </Badge>
          <div className="bg-gray-100 py-1 px-4 rounded-lg flex items-center gap-4 cursor-pointer" onClick={open}>
            <BsFillPersonFill fontSize={22} className='text-gray-500'/>
            <span className="font-bold text-base text-gray-600 capitalize hidden lg:block md:block">
              Hii, {user.name}
            </span>
          </div>
        </div>
      </div>
      <div className="relative">{isOpen?<AdminProfileBanner/>:<div className="h-0 w-0"></div>}</div>
    </div>
  );
};

export default Header;
