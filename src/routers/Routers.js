import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import Login from "../pages/login";
import Dashboard from "../pages/Dashboard";
import Reserve from "../pages/Reserve";
import AddCredits from "../pages/addCredits";
import DashAd from "../pages/DashAd";
import LoginAdm from "../pages/LoginAdm";
import AddAdmin from "../pages/AddAdmin";
import AddBike from "../pages/AddBike";
import AddOwner from "../pages/addOwner";
import UpdateBikeDetails from "../pages/updateBike";
import Dashboardowner from "../pages/ownerDash";
import Withdraw from "../pages/withdraw";
import Loginowner from "../pages/loginOwner";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reserve/:slug" element={<Reserve />} />
      <Route path="/add-credits" element={<AddCredits />} />
      <Route path="/admin-dash" element={<DashAd />} />
      <Route path="/LoginAdm" element={<LoginAdm />} />
      <Route path="/add-admin" element={<AddAdmin />} />
      <Route path="/add-bike" element={<AddBike />} />
      <Route path="/add-owner" element={<AddOwner />} />
      <Route path="update-bike/:slug" element= {<UpdateBikeDetails />} />
      <Route path="/ownerDash" element={<Dashboardowner />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/owner" element={<Loginowner />} />
    </Routes>
  );
};

export default Routers;
