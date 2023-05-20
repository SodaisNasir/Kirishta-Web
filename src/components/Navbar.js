import React, { useState } from "react";
import Logo from "../assets/images/krista_main.png";
import { NavLink } from "react-router-dom";
import { navLinks } from "../constants/data";

const Navbar = () => {
  return (
    <nav className="w-full max-w-[250px] text-[14px] px-5 py-8">
      <img className="w-2/3 mb-10" src={Logo} alt="kirista logo" />

      <div className="">
        {navLinks.map((data) => (
          <NavItem key={data.title} data={data} />
        ))}
      </div>
    </nav>
  );
};

const NavItem = ({ data }) => {
  const [toggle, setToggle] = useState(false);

  // if Nav item is a link
  if (data.path) {
    return (
      <NavLink
        to={data.path}
        className={({ isActive }) => {
          return `${
            isActive ? "text-blue-600 font-semibold" : "text-[#091A35]"
          } flex items-center hover:text-blue-700 my-5`;
        }}
      >
        {/* <img className="w-4" src={data.icon} alt="icon" /> */}
        {data.icon}
        <span className="ml-3">{data.title}</span>
      </NavLink>
    );
  }

  // if Nav item is a Dropdown
  return (
    <>
      <div
        className="flex items-center my-5 mb-2 cursor-pointer text-[#091A35] hover:text-blue-700"
        onClick={() => setToggle(!toggle)}
      >
        {/* <img className="w-4" src={data.icon} alt="icon" /> */}
        {data.icon}
        <span className="ml-3">{data.title}</span>
      </div>
      <div className={`${toggle ? "block" : "hidden"} relative ml-7`}>
        <div className="absolute left-[3px] bg-[#909090] w-0.5 h-full -z-10" />
        {data.items.map(({ path, title }) => (
          <NavLink
            key={title}
            to={path}
            className={({ isActive }) => {
              return `${
                isActive ? "font-semibold" : "font-normal"
              } group flex items-center max-w-fit transition-all duration-300 hover:font-semibold text-[#909090] z-10`;
            }}
          >
            <div
              className={`${
                window.location.pathname === path
                  ? "bg-[#909090] scale-110"
                  : "bg-[#D9D9D9]"
              } group-hover:bg-[#909090] group-hover:scale-125 rounded-full transition-all duration-300 w-2 h-2 mr-2 my-2`}
            />
            {title}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Navbar;
