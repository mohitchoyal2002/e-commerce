import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from 'react-redux'
import {User} from '../../features/userSlice'

const ManageAddress = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPinCode] = useState("");
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [alternate, setAlternate] = useState("");

  const user = useSelector(User)

  const editInputs = () => {
    const inputs = document.getElementsByClassName("per-input");
    const btn = document.getElementById("btn");

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].disabled === true) {
        inputs[i].disabled = false;
      } else {
        inputs[i].disabled = true;
      }
    }
    if(btn.style.visibility === 'visible'){
      btn.style.visibility = 'hidden'
    }
    else{
      btn.style.visibility = 'visible';
    }
  };

  const showSuccessMessage = ()=>{
    toast.success('Address Updated',{position: "top-right"})
  }

  const showFailedMessage = ()=>{
    toast.error("An Error Occured", {position: 'top-right'})
  }

  const setNewAddress = async(e)=>{
    e.preventDefault()
    editInputs()
    try{
      await axios.put('/users/update-address', {city, state, locality, address, landmark, pincode, email: user.email})
      showSuccessMessage();
    }
    catch(err){
      showFailedMessage()
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl flex flex-col gap-16 pb-10 py-10 font-montserrat">
      <h1 className=" flex items-center gap-10 text-4xl font-cinzel font-bold">
        Manage Address
        <button
          className="text-custom-purple font-bold font-montserrat text-base"
          onClick={editInputs}
        >
          Edit
        </button>
      </h1>
      <ToastContainer/>
      <div>
        <form className="flex flex-wrap gap-10 px-5 w-3/4" onSubmit={(e)=>{setNewAddress(e)}}>
          <div className="flex flex-col gap-1 w-1/3">
            <span className="text-sm text-dark-purple font-medium">Name</span>
            <input
              type="text"
              className="per-input border px-3 h-11 focus:outline-none disabled:brightness-90 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg"
              onChange={(e) => setName(e.target.value)}
              value={name}
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-1 w-1/3">
            <span className="text-sm text-dark-purple font-medium">
              Phone No
            </span>
            <input
              type="text"
              className="per-input border px-3 h-11 focus:outline-none disabled:brightness-90 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-1 w-1/3">
            <span className="text-sm text-dark-purple font-medium">
              Pin Code
            </span>
            <input
              type="text"
              className="per-input border px-3 h-11 focus:outline-none disabled:brightness-90 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg"
              onChange={(e) => setPinCode(e.target.value)}
              value={pincode}
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-1 w-1/3">
            <span className="text-sm text-dark-purple font-medium">
              Locality
            </span>
            <input
              type="text"
              className="per-input border px-3 h-11 focus:outline-none disabled:brightness-90 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg"
              onChange={(e) => setLocality(e.target.value)}
              value={locality}
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-1 w-full pr-16">
            <span className="text-sm text-dark-purple font-medium">
              Address
            </span>
            <textarea
              type="text"
              className="per-input border px-3 focus:outline-none disabled:brightness-90 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg resize-none w-3/4"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
              disabled={true}
              rows="5"
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-1/3">
            <span className="text-sm text-dark-purple font-medium">City</span>
            <input
              type="text"
              className="per-input border px-3 h-11 focus:outline-none disabled:brightness-90 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-1 w-1/3">
            <span className="text-sm text-dark-purple font-medium">State</span>
            <input
              type="text"
              className="per-input border px-3 h-11 focus:outline-none disabled:brightness-90 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg"
              onChange={(e) => setState(e.target.value)}
              value={state}
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-1 w-1/3">
            <span className="text-sm text-dark-purple font-medium">
              Landmark
            </span>
            <input
              type="text"
              className="per-input border px-3 h-11 focus:outline-none disabled:brightness-90 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg"
              onChange={(e) => setLandmark(e.target.value)}
              value={landmark}
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-1 w-1/3">
            <span className="text-sm text-dark-purple font-medium">
              Alternate No.
            </span>
            <input
              type="text"
              className="per-input border px-3 h-11 focus:outline-none disabled:brightness-90 disabled:cursor-not-allowed text-dark-purple font-montserrat font-medium rounded-lg"
              onChange={(e) => setAlternate(e.target.value)}
              value={alternate}
              disabled={true}
            />
          </div>
          <button
            id="btn"
            className="w-80 bg-custom-purple h-10 text-white cursor-pointer rounded-lg invisible"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageAddress;
