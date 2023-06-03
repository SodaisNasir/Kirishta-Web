import React, { useLayoutEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./index";
import { FaBars } from "react-icons/fa";

const AdminLayout = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  useLayoutEffect(() => {
    setToggle(false);
  }, [location]);

  return (
    <div className="relative flex font-poppins">
      <Navbar {...{ toggle, setToggle }} />

      <div className="h-screen overflow-y-auto w-full border-l-2 border-[#EEF2F5]">
        {/* Menu btn (bars icon) */}
        <button
          onClick={() => setToggle(true)}
          className={`md:hidden lg:hidden pl-3 pt-5 text-[#222222]`}
        >
          <FaBars />
        </button>

        {/* Backdrop (when menu opens) */}
        <div
          onClick={() => setToggle(false)}
          className={`${
            toggle ? "" : "hidden"
          } md:hidden fixed inset-0 bg-black/40 z-[2]`}
        />

        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
