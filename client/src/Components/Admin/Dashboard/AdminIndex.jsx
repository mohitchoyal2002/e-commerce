import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setUser } from "../../../features/userSlice";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const AdminIndex = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("admin_token");
      if (token === undefined) {
        navigate("/admin-login");
      } else {
        try {
          const res = await axios.get('/admin/check-user')
          dispatch(setUser(res.data))
        } catch (err) {
          navigate("/admin-login");
        }
        finally{
          setLoading(false)
        }
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <img src="/images/loading.svg" alt="loading" className="h-32 w-32" />
      </div>
    );
  }

  return (
    <div className="flex w-full max-h-24">
      <Sidebar />
      <div style={{ flex: 6 }}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminIndex;
