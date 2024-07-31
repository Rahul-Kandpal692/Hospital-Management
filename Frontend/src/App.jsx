import React from "react";
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { Context } from "./main";
import { useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer";


const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        console.log("error in app.jsx:", error);
        setUser({});
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/appointment" element={<Appointment/>}/>
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
        <ToastContainer position="top-center"/>
      </Router>
      <Footer></Footer>
    </>
  )
}

export default App
