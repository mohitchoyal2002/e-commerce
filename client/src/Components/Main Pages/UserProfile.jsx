import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setUser, User } from "../../features/userSlice";
import Header from "../Navigation Bar/Header";
import { Link } from "react-router-dom";
import { BsChevronRight, BsFillPersonFill } from "react-icons/bs";
import Footer from "../Navigation Bar/Footer";
// import AccountSetting from "./AccountSetting";

const UserProfile = () => {
  const [load, setLoad] = useState(true);

  const user = useSelector(User);
  // console.log(user);

  const [rootUser, setRootUser] = useState(user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    const checkUser = async () => {
      const token = Cookies.get("user_token");
      if (token !== undefined) {
        try {
          const res = await axios.get("/users/check-user");
          dispatch(setUser(res.data));
          setRootUser(res.data);
        } catch (err) {
          dispatch(setUser(null));
          navigate("/");
          console.log(err);
        } finally {
          setLoad(false);
        }
      } else {
        navigate("/");
      }
    };

    checkUser();
    return () => abortController.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (load || user === null) {
    return (
      <div className=" h-screen w-screen flex items-center justify-center">
        <img src="/images/loading.svg" alt="" />
      </div>
    );
  } else {
    return (
      <>
      <div className="flex w-screen">
        <Header />
        <div className="flex w-screen">
          <div className="flex flex-col w-96 items-center gap-5 px-2 py-40 shadow-2xl">
            <div className="flex items-center w-full gap-4 no-underline text-dark-purple text-xl font-medium bg-gray-100 py-3 rounded-lg px-4 ">
              <img src="/images/profile.svg" alt="" />
              <div>
                <span className="text-sm font-light text-dark-purple">
                  Hello,{" "}
                </span>
                <h2>{`${rootUser.firstName} ${rootUser.lastName}`}</h2>
              </div>
            </div>
            <Link
              to="/orders"
              className="flex justify-between items-center w-full gap-2 no-underline text-dark-purple text-xl font-medium bg-gray-100 py-3 px-8 rounded-lg"
            >
              <span className="flex gap-3 items-center">
                <TbTruckDelivery className="text-2xl" /> My Orders
              </span>
              <span>
                <BsChevronRight />
              </span>
            </Link>
            <div className="flex flex-col w-full gap-2 no-underline text-dark-purple text-xl font-medium bg-gray-100 py-3 px-8 rounded-lg">
              <span className="flex gap-2 items-center">
                <BsFillPersonFill className="text-2xl" /> Account Setting
              </span>
              <ul className="list-none pl-4 text-base flex flex-col gap-2 mt-3">
                <li className="hover:text-custom-purple">
                  <Link to="">Profile Information</Link>
                </li>
                <li className="hover:text-custom-purple">
                  <Link to="manage-address">Manage Address</Link>
                </li>
                <li className="hover:text-custom-purple">
                  <Link to="">PAN Card Information</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full pt-28 pl-4 bg-gray-100 overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer/>
      </>
    );
  }
};

export default UserProfile;
