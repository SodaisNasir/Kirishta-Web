import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./";

const AdminLayout = () => {
  return (
    <div className="flex w-full h-full font-poppins">
      <Navbar />

      <div className="w-full border-l-2 border-[#EEF2F5]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
