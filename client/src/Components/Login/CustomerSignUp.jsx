import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../features/userSlice";
import { auth, provider } from "../Config/firebase";
import LeftContainer from "./LeftContainer";

const CustomerSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const[gender, setGender] = useState('male')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const disable = () => {
    const btn = document.querySelector(".btn");
    const gbtn = document.querySelector(".g-btn");

    btn.disabled = true;
    gbtn.disabled = true;
  };

  const enable = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhoneNo("");
    setRePassword("");
    const btn = document.querySelector(".btn");
    const gbtn = document.querySelector(".g-btn");

    btn.disabled = false;
    gbtn.disabled = false;
  };

  const google = async () => {
    const msg = document.getElementById("msg");
    try {
      disable();
      const user = await signInWithPopup(auth, provider);
      const res = await axios.post("/users/google-auth", user);
      dispatch(setUser(res.data));
      navigate("/home");
    } catch (err) {
      msg.innerText = "User already Registered";
      msg.style.color = "red";
      console.log(err);
    } finally {
      enable();
    }
  };

  const success = () => {
    const msg = document.getElementById("msg");
    msg.innerText = "You have been registered Successfully";
    msg.style.color = "green";
  };

  const failed = () => {
    const msg = document.getElementById("msg");
    msg.innerText = "User with provided email already registered";
    msg.style.color = "red";
  };

  const checkPassword = (e) => {
    const err = document.getElementById("err");
    setRePassword(e.target.value);
    if (e.target.value !== password) {
      err.innerText = "password dosen't match";
      const btn = document.querySelector(".btn");
      btn.disabled = true;
    } else {
      const btn = document.querySelector(".btn");
      btn.disabled = false;
      err.innerText = "";
    }
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      disable();
      const res = await axios.post("/users/signup", {
        firstName,
        lastName,
        email,
        password,
        phoneNo,
        gender
      });
      console.log(res.data);
      success();
    } catch (err) {
      failed();
      console.log(err);
    } finally {
      enable();
    }
  };

  return (
    <div className="flex w-screen h-full">
      <LeftContainer />
      <div className="flex flex-col pt-28 items-center h-screen pb-6 justify-between w-full font-semibold font-montserrat">
        <div className="flex flex-col items-center gap-5 w-full px-10">
          <h1 className="text-blue-600 text-5xl">Welcome To ECommerce</h1>
          <img src="/images/logo.png" alt="" className="h-28 w-28" />
          <h2 className="font-light text-3xl">Register Yourself</h2>
          <span id="msg"></span>
          <form
            className="flex flex-wrap gap-5 justify-center"
            onSubmit={signup}
          >
            <div className="flex flex-col">
              <span className="pl-2 text-sm font-normal">First Name*</span>
              <input
                type="text"
                className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-80 text-base font-medium focus:outline-none"
                placeholder="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
                required
              />
            </div>
            <div className="flex flex-col">
              <span className="pl-2 text-sm font-normal">Last Name*</span>
              <input
                type="text"
                className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-80 text-base font-medium focus:outline-none"
                placeholder="Last Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
                required
              />
            </div>

            <div className="flex flex-col">
              <span className="pl-2 text-sm font-normal">Gender*</span>
              <select
                onChange={(e)=>setGender(e.target.value)}
                value={gender}
                className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-80 text-base font-medium focus:outline-none"
                required
              >
                <option name="male" value={"male"}>
                  Male
                </option>
                <option name="female" value={"female"}>
                  Female
                </option>
              </select>
            </div>

            <div className="flex flex-col">
              <span className="text-sm pl-2 font-normal">Email*</span>
              <input
                type="email"
                className="border border-blue-600 rounded-lg h-10 pl-4 text-gray-700 width w-80 text-base font-medium focus:outline-none"
                placeholder="Your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                required
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm pl-2 font-normal">Phone No.*</span>
              <input
                type="text"
                className="border border-blue-600 rounded-lg text-gray-700 h-10 pl-4 width w-80 text-base font-medium focus:outline-none"
                placeholder="Your Phone No."
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                }}
                value={phoneNo}
                required
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm pl-2 font-normal">Create Password*</span>
              <input
                type="password"
                className="border border-blue-600 rounded-lg text-gray-700 h-10 pl-4 width w-80 text-base font-medium  focus:outline-none"
                placeholder="Your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                required
              />
            </div>
            <div className="flex flex-col">
              <span className="pl-2 text-sm font-normal">
                Confirm Password*
              </span>
              <input
                type="password"
                className="border border-blue-600 rounded-lg h-10 text-gray-700 pl-4 width w-80 text-base font-medium focus:outline-none"
                placeholder="re-Enter Your Password Again"
                onChange={(e) => {
                  checkPassword(e);
                }}
                value={rePassword}
                required
              />
              <span
                id="err"
                className="pl-2 text-sm font-normal text-red-600"
              ></span>
            </div>
            <button className="btn disabled:brightness-75 disabled:cursor-not-allowed mt-4 h-10 rounded-xl w-80 bg-blue-600 text-white text-lg font">
              Sign Up
            </button>
          </form>
          <button
            className="g-btn flex gap-5 items-center justify-center btn w-80 h-10 rounded-xl bg-white text-lg focus:outline-none shadow-lg cursor-pointer disabled:brightness-75"
            onClick={google}
          >
            <img src="/images/google.svg" alt="" />
            Google
          </button>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm font-light">
            Already a Member?{" "}
            <Link to="/" className="text-blue-800">
              Login
            </Link>
          </span>
          <Link to="/admin-login" className="text-sm font-light text-blue-800">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignUp;
