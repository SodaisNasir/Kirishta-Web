import React, { useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { languages } from "../constants/data";
import { MdLock, MdLogout } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context";

export const DropdownContainer = ({ extraStyles = "", onClick, children }) => {
  return (
    <ul
      onClick={onClick}
      className={`absolute top-[130%] right-0 flex flex-col text-xs bg-white rounded-xl px-4 py-1 shadow-xl shadow-gray-300 border z-10 ${extraStyles}`}
    >
      {children}
    </ul>
  );
};

export const DropdownFilter = ({
  toggle,
  setToggle,
  curFilter,
  title,
  arr,
  handleClick,
}) => {
  return (
    <button
      onClick={setToggle}
      className={`relative flex items-center text-black ${
        curFilter.filter?.toLowerCase().includes(title?.toLowerCase())
          ? "bg-blue-100 hover:bg-blue-200"
          : "bg-gray-50 hover:bg-gray-100"
      } focus:outline-1 focus:outline-gray-800 font-medium rounded-lg text-xs px-4 py-1.5 ml-3 text-center capitalize`}
    >
      {curFilter.filter?.toLowerCase().includes(title?.toLowerCase())
        ? curFilter.value
        : title}
      <FaChevronUp className={`${toggle ? "" : "rotate-180"} ml-2`} />
      {toggle && (
        <DropdownContainer extraStyles="w-full text-black font-medium text-xs text-left">
          <li
            onClick={() => handleClick(null)}
            role="option"
            aria-selected={curFilter.value === null}
            className={`w-full border-b p-1 hover:text-gray-600 cursor-pointer whitespace-nowrap`}
          >
            All
          </li>
          {arr.map((elem, indx) => (
            <li
              key={elem + indx}
              onClick={() => handleClick(elem)}
              role="option"
              aria-selected={elem === curFilter.value}
              className={`${
                indx !== arr.length - 1 ? "border-b" : ""
              } w-full p-1 hover:text-gray-600 cursor-pointer whitespace-nowrap`}
            >
              {elem}
            </li>
          ))}
        </DropdownContainer>
      )}
    </button>
  );
};

export const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <div className="relative mr-2.5">
      <button
        onClick={() => setLanguage({ ...language, state: !language.state })}
        className={`flex items-center text-black bg-gray-50 hover:bg-gray-100 text-center text-sm px-3 py-1.5 rounded-md`}
      >
        {language.value}
        <FaChevronUp
          className={`${language.state ? "" : "rotate-180"} text-xs ml-1`}
        />
      </button>
      {language.state && (
        <DropdownContainer extraStyles="text-black font-medium text-xs text-left">
          {languages.map((elem, indx) => (
            <li
              key={elem + indx}
              onClick={() => setLanguage({ state: false, value: elem })}
              role="option"
              aria-selected={elem === language.value}
              className={`${
                indx !== languages.length - 1 ? "border-b" : ""
              } p-1 hover:text-gray-600 cursor-pointer whitespace-nowrap`}
            >
              {elem}
            </li>
          ))}
        </DropdownContainer>
      )}
    </div>
  );
};

export const Account = ({ toggle, setToggle }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const arr = [
    {
      title: "Change Password",
      icon: <MdLock className="text-base text-blue-500" />,
      clickHandler: () => navigate("/change-password/"),
    },
    {
      title: "Edit Profile",
      icon: <RiEdit2Fill className="text-base text-blue-500" />,
      clickHandler: () => navigate("/edit-profile"),
    },
    {
      title: "Log out",
      icon: <MdLogout className="text-base text-red-600" />,
      clickHandler: logout,
    },
  ];

  return (
    <div className="relative">
      <div
        className="min-w-max flex items-center bg-gray-50 hover:bg-gray-100 p-1.5 px-2.5 rounded-md space-x-3 cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        <img
          className="w-[30px] h-[30px] rounded-full text-xs bg-gray-100"
          src={user.profile_image}
          alt="profile"
        />
        <p className="flex flex-col text-xs font-medium capitalize whitespace-nowrap">
          {user.name}
          <span className="text-[10px] font-light capitalize">{user.role}</span>
        </p>
        <FaChevronDown className={`text-sm ${toggle ? "rotate-180" : ""}`} />
      </div>
      {toggle && (
        <DropdownContainer extraStyles="!w-full">
          {arr.map((elem, indx) => (
            <li
              key={elem.title}
              onClick={elem.clickHandler}
              className={`${
                arr.length - 1 !== indx ? "border-b border-[#efefef]" : ""
              } w-full flex py-2 cursor-pointer text-gray-600 hover:text-black`}
            >
              {elem.icon}
              <span className="ml-2 whitespace-nowrap">{elem.title}</span>
            </li>
          ))}
        </DropdownContainer>
      )}
    </div>
  );
};
