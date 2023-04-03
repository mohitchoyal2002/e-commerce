// import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, User } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

const UserProfileInfo = () => {
  const user = useSelector(User);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`users/get-info/${user.email}`);
        const info = res.data;
        // console.log(info);
        setEmail(info.email);
        setPhone(info.phone);
        setFirstName(info.firstName);
        setLastName(info.lastName);
        setGender(info.gender);
      } catch (err) {
        navigate('/')
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const perClick = () => {
    const btn = document.querySelector("#per-edit");
    const sub = document.querySelector("#per-submit");
    const inputs = document.querySelectorAll(".per-input");
    if (btn.innerText === "Edit") {
      btn.innerText = "Cancel";
      for (let x of inputs) {
        x.disabled = false;
      }
      sub.style.display = "flex";
    } else {
      btn.innerText = "Edit";
      for (let x of inputs) {
        x.disabled = true;
      }
      sub.style.display = "none";
    }
  };

  const emailClick = () => {
    const btn = document.querySelector("#email-edit");
    const sub = document.querySelector("#email-submit");
    const inputs = document.querySelectorAll(".email-input");
    if (btn.innerText === "Edit") {
      btn.innerText = "Cancel";
      for (let x of inputs) {
        x.disabled = false;
      }
      sub.style.display = "flex";
    } else {
      btn.innerText = "Edit";
      for (let x of inputs) {
        x.disabled = true;
      }
      sub.style.display = "none";
    }
  };

  const phoneClick = () => {
    const btn = document.querySelector("#phone-edit");
    const sub = document.querySelector("#phone-submit");
    const inputs = document.querySelectorAll(".phone-input");
    if (btn.innerText === "Edit") {
      btn.innerText = "Cancel";
      for (let x of inputs) {
        x.disabled = false;
      }
      sub.style.display = "flex";
    } else {
      btn.innerText = "Edit";
      for (let x of inputs) {
        x.disabled = true;
      }
      sub.style.display = "none";
    }
  };

  const perSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email: user.email,
      newFirstName: firstName,
      newLastName: lastName,
      newGender: gender,
    };
    try {
      const res = await axios.put("/users/change-personal-info", newUser);
      dispatch(setUser(res.data));
    } catch (err) {
      console.log(err);
    } finally {
      perClick();
    }
  };

  const emailSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      currEmail: user.email,
      newEmail: email,
    };
    try {
      const res = await axios.put("/users/change-user-mail", newUser);
      // console.log(res.data);
      dispatch(setUser(res.data));
    } catch (err) {
      console.log(err);
    } finally {
      emailClick();
    }
  };

  const phoneSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email: user.email, phoneNo: phone };

      const res = await axios.put("/users/change-phone", newUser);
      dispatch(setUser(res.data));
    } catch (err) {
      console.log(err);
    }
    finally{
      phoneClick()
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-4 h-full rounded-xl flex items-center justify-center">
        <img src="/images/loading.svg" alt="" />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl flex flex-col gap-16">
      <h1 className="text-4xl font-cinzel font-bold text-center">User Info</h1>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-10">
          <span className="text-2xl font-medium text-dark-purple">
            Personal Information
          </span>
          <button
            id="per-edit"
            className="text-custom-purple"
            onClick={perClick}
          >
            Edit
          </button>
        </div>
        <form
          onSubmit={perSubmit}
          className="flex flex-wrap items-center gap-4"
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm text-dark-purple font-medium">
              First Name
            </span>
            <input
              type="text"
              className="per-input border px-3 h-11 focus:outline-none disabled:brightness-90 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-dark-purple font-medium">
              Last Name
            </span>
            <input
              type="text"
              className="per-input border px-3 h-11 focus:outline-none disabled:brightness-90 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-dark-purple font-medium">Gender</span>
            <select
              disabled={true}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="per-input h-11 px-4 focus:outline-none border disabled:brightness-95 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg"
            >
              <option name="male" value={"male"}>
                Male
              </option>
              <option name="female" value={"female"}>
                Female
              </option>
            </select>
          </div>
          <div id="per-submit" className="flex-col gap-1 pt-6 hidden">
            <button
              type="submit"
              className="bg-custom-purple text-white font-roboto font-medium h-11 px-6 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-10">
          <span className="text-2xl font-medium text-dark-purple">Email</span>
          <button
            id="email-edit"
            className="text-custom-purple"
            onClick={emailClick}
          >
            Edit
          </button>
        </div>
        <form
          onSubmit={emailSubmit}
          className="flex flex-wrap items-center gap-4"
        >
          <div className="flex flex-col gap-1">
            <input
              type="text"
              className="email-input border px-3 h-11 focus:outline-none disabled:brightness-90 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg w-80"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={true}
            />
          </div>
          <div id="email-submit" className="flex-col gap-1 hidden">
            <button
              type="submit"
              className="bg-custom-purple text-white font-roboto font-medium h-11 px-6 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-10">
          <span className="text-2xl font-medium text-dark-purple">
            Phone No.
          </span>
          <button
            id="phone-edit"
            className="text-custom-purple"
            onClick={phoneClick}
          >
            Edit
          </button>
        </div>
        <form
          onSubmit={phoneSubmit}
          className="flex flex-wrap items-center gap-4"
        >
          <div className="flex flex-col gap-1">
            <input
              type="text"
              className="phone-input border px-3 h-11 focus:outline-none disabled:brightness-90 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg w-80"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              disabled={true}
            />
          </div>
          <div id="phone-submit" className="flex-col gap-1  hidden">
            <button
              type="submit"
              className="bg-custom-purple text-white font-roboto font-medium h-11 px-6 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col font-montserrat gap-8 pr-20">
        <h1 className="text-dark-purple text-3xl font-bold">FAQs</h1>
        <div className="text-dark-purple">
          <span className="font-bold text-sm">
            What happens when I update my email address (or mobile number)?
          </span>
          <p className="text-sm mt-4">
            Your login email id (or mobile number) changes, likewise. You'll
            receive all your account related communication on your updated email
            address (or mobile number).
          </p>
        </div>
        <div className="text-dark-purple">
          <span className="font-bold text-sm">
            When will my e-commerce account be updated with the new email
            address (or mobile number)?
          </span>
          <p className="text-sm mt-4">
            It happens as soon as you confirm the verification code sent to your
            email (or mobile) and save the changes.
          </p>
        </div>

        <div className="text-dark-purple">
          <span className="font-bold text-sm">
            What happens to my existing Flipkart account when I update my email
            address (or mobile number)?
          </span>
          <p className="text-sm mt-4">
            Updating your email address (or mobile number) doesn't invalidate
            your account. Your account remains fully functional. You'll continue
            seeing your Order history, saved information and personal details.
          </p>
        </div>

        <div className="text-dark-purple">
          <span className="font-bold text-sm">
            Does my Seller account get affected when I update my email address?
          </span>
          <p className="text-sm mt-4">
            Flipkart has a 'single sign-on' policy. Any changes will reflect in
            your Seller account also.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
