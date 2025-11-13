import React from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const MainLayout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
