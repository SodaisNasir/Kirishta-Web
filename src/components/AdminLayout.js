import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./index";

const AdminLayout = () => {
  return (
    <div className="relative flex font-poppins">
      <Navbar />

      <div className="h-screen overflow-y-auto w-full border-l-2 border-[#EEF2F5]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
