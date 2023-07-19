import React from "react";
import { FaChevronUp } from "react-icons/fa";
import { languages } from "../constants/data";

export const DropdownContainer = ({ extraStyles = "", children }) => {
  return (
    <ul
      className={`absolute top-[140%] right-0 flex flex-col max-w-max text-xs bg-white rounded-xl px-4 py-1 shadow-xl shadow-gray-300 border z-10 ${extraStyles}`}
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
    <button
      onClick={() => setLanguage((prev) => ({ ...prev, state: !prev.state }))}
      className={`relative flex items-center text-black bg-gray-50 hover:bg-gray-100 text-center`}
    >
      {language.value}
      <FaChevronUp className={`${language.state ? "" : "rotate-180"} ml-1`} />
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
    </button>
  );
};
