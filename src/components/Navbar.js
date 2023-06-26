import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { navLinks } from "../constants/data";
import { VscClose } from "react-icons/vsc";

const Navbar = ({ toggle, setToggle }) => {
  return (
    <>
      <nav
        id="navbar"
        className={`h-screen overflow-y-auto absolute md:static top-0 left-0 bg-white ${
          toggle ? "" : "-translate-x-full md:-translate-x-0"
        } max-md:transition-all max-md:duration-300 w-full max-w-[250px] px-5 pb-7 md:py-8 z-[3]`}
      >
        {/* close btn (inside navbar) */}
        <button
          onClick={() => setToggle(false)}
          className="md:hidden mt-3 text-lg"
        >
          <VscClose />
        </button>

        <img className="w-2/3 mb-10" src={Logo} alt="kirista logo" />

        <div className="">
          {navLinks.map((data) => (
            <NavItem key={data.title} {...{ data }} />
          ))}
        </div>
      </nav>
    </>
  );
};

const NavItem = ({ data, privilages }) => {
  const [toggle, setToggle] = useState(false);

  // if Nav item is a link
  if (data.path) {
    return (
      <NavLink
        to={data.path}
        className={({ isActive }) => {
          return `${
            isActive ? "text-blue-500 font-semibold" : "text-[#091A35]"
          } flex items-center hover:text-blue-500 my-5`;
        }}
      >
        {/* <img className="w-4" src={data.icon} alt="icon" /> */}
        {data.icon}
        <span className="text-xs ml-3">{data.title}</span>
      </NavLink>
    );
  }

  // if Nav item is a Dropdown
  return (
    <>
      <div
        className="flex items-center my-5 mb-2 cursor-pointer text-[#091A35] hover:text-blue-500"
        onClick={() => setToggle(!toggle)}
      >
        {/* <img className="w-4" src={data.icon} alt="icon" /> */}
        {data.icon}
        <span className="text-xs ml-3">{data.title}</span>
      </div>
      <div className={`${toggle ? "block" : "hidden"} relative ml-7 text-xs`}>
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
