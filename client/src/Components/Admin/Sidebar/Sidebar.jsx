import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineSettingsSystemDaydream, MdSettings, MdSpaceDashboard } from "react-icons/md";
import { AiFillCreditCard, AiOutlineShop } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { BsBarChartLineFill, BsPersonCircle } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import {MdOutlinePsychology} from 'react-icons/md'
import axios from "axios";
import { setUser } from "../../../features/userSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = async()=>{
    try{
      await axios.get('/admin/logout')
      dispatch(setUser(null))
      navigate('/admin-login')
    }
    catch(err){

    }
  }

  return (
    <div className="flex-1 min-h-screen border-r border-gray-200 pt-2 font-nunito">
      <div className="w-full h-20 flex items-center justify-center pb-3 border-b mb-3">
        <img src="/images/logo.png" alt="" className="h-full" />
      </div>
      <div className="pl-2">
        <p className="font-semibold text-gray-500 text-xs pb-1">MAIN</p>
        <Link
          to=""
          className="pl-3 flex items-center gap-1 text-gray-500 text-sm py-2 hover:bg-gray-200 mb-2"
        >
          <MdSpaceDashboard fontSize={18} className="text-custom-purple" />
          <span className="hidden lg:block md:block">Dashboard</span>
        </Link>
        <p className="font-semibold text-gray-500 text-xs pb-1">LISTS</p>
        <Link
          to="products"
          className="pl-3 flex items-center gap-1 text-gray-500 text-sm py-2 hover:bg-gray-200"
        >
          <AiOutlineShop fontSize={18} className="text-custom-purple" />
          <span className="hidden lg:block md:block">Products</span>
        </Link>
        <Link
          to="orders"
          className="pl-3 flex items-center gap-1 text-gray-500 text-sm py-2 hover:bg-gray-200"
        >
          <AiFillCreditCard fontSize={18} className="text-custom-purple" />
          <span className="hidden lg:block md:block">Orders</span>
        </Link>
        <Link
          to="delivery"
          className="pl-3 flex items-center gap-1 text-gray-500 text-sm py-2 hover:bg-gray-200 mb-2"
        >
          <TbTruckDelivery fontSize={18} className="text-custom-purple" />
          <span className="hidden lg:block md:block">Delivery</span>
        </Link>

        <p className="font-semibold text-gray-500 text-xs pb-1">USEFUL</p>
        <Link
          to="stats"
          className="pl-3 flex items-center gap-1 text-gray-500 text-sm py-2 hover:bg-gray-200 mb-2"
        >
          <BsBarChartLineFill fontSize={18} className="text-custom-purple" />
          <span className="hidden lg:block md:block">Stats</span>
        </Link>
        <p className="font-semibold text-gray-500 text-xs pb-1">SERVICES</p>
        <Link
          to=""
          className="pl-3 flex items-center gap-1 text-gray-500 text-sm py-2 hover:bg-gray-200"
        >
          <MdOutlineSettingsSystemDaydream fontSize={18} className="text-custom-purple" />
          <span className="hidden lg:block md:block">System Health</span>
        </Link>
        <Link
          to=""
          className="pl-3 flex items-center gap-1 text-gray-500 text-sm py-2 hover:bg-gray-200"
        >
          <MdOutlinePsychology fontSize={20} className="text-custom-purple" />
          <span className="hidden lg:block md:block">Logs</span>
        </Link>
        <Link
          to="setting"
          className="pl-3 flex items-center gap-1 text-gray-500 text-sm py-2 hover:bg-gray-200 mb-2"
        >
          <MdSettings fontSize={18} className="text-custom-purple" />
          <span className="hidden lg:block md:block">Setting</span>
        </Link>

        <p className="font-semibold text-gray-500 text-xs pb-1">USER</p>
        <Link
          to="admin-profile"
          className="pl-3 flex items-center gap-1 text-gray-500 text-sm py-2 hover:bg-gray-200"
        >
          <BsPersonCircle fontSize={18} className="text-custom-purple" />
          <span className="hidden lg:block md:block">Profile</span>
        </Link>
        <button
          onClick={logout}
          className="pl-3 flex items-center gap-1 text-gray-500 text-sm py-2 hover:bg-gray-200 w-full"
        >
          <CgLogOut fontSize={18} className="text-custom-purple" />
          <span className="hidden lg:block md:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
