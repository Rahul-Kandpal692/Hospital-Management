import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
     const res=await axios.get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (error) {
        toast.error(error.response.data.message)
    }
  };
  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };
  return (
    <>
    <nav
      className={show ? "show sidebar" : "sidebar"}
      style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
    >
      <div className="links">
        <TiHome onClick={gotoHomePage} />
        <FaUserDoctor onClick={gotoDoctorsPage} />
        <MdAddModerator onClick={gotoAddNewDoctor} />
        <IoPersonAddSharp onClick={gotoAddNewAdmin} />
        <AiFillMessage onClick={gotoMessagesPage} />
        <RiLogoutBoxFill onClick={handleLogout} />
      </div>
    </nav>
    <div className="wrapper" style={!isAuthenticated ? { display: "none" } : { display: "flex" }}>
        <GiHamburgerMenu className="hamburger" onClick={()=>setShow(!show)}/>
    </div>
    </>
  );
};

export default Sidebar;
