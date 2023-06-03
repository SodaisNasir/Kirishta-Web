import React, { useState } from "react";
import { countries } from "../constants/data";
import { GoChevronDown } from "react-icons/go";
import { DropdownContainer } from "./helpers";

const CountrySelector = ({ toggle, setToggle }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleSelect = (data) => {
    return setSelectedCountry(data);
  };

  return (
    <button
      onClick={() => setToggle("countrySelector", !toggle)}
      className="relative flex items-center text-xs bg-gray-50 hover:bg-gray-100 p-2 py-1.5 rounded-[6px] cursor-pointer"
    >
      <img
        className="w-4 h-auto"
        src={selectedCountry["Country Flag"]}
        alt={selectedCountry.title + " flag"}
      />
      <span className="pl-1.5 pr-1 text-[10px]">{selectedCountry.title}</span>
      <span className={toggle ? "rotate-180" : ""}>
        <GoChevronDown />
      </span>

      {/* Dropdown */}
      {toggle && (
        <DropdownContainer extraStyles="text-left translate-x-[57%] xs:translate-x-0">
          {countries.map((data, idx) => (
            <div
              key={data.title + idx}
              onClick={() => handleSelect(data)}
              className={`flex items-center p-1 pr-8 cursor-pointer hover:text-gray-500 ${
                idx !== countries.length ? "border-b border-[#f2f2f2]" : ""
              }`}
              role="option"
            >
              <img
                className="w-4 h-auto"
                src={data["Country Flag"]}
                alt={data.title + " flag"}
              />
              <span className="pl-4 text-[10px]">{data.title}</span>
            </div>
          ))}
        </DropdownContainer>
      )}
    </button>
  );
};

export default CountrySelector;
