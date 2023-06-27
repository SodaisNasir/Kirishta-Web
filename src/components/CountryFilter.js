import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { DropdownContainer } from "./helpers";

const CountryFilter = ({
  toggle,
  setToggle,
  curFilter,
  handleClick,
  countries,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSelect = (data) => {
    console.log("data", data);
    handleClick(data);
    setSelectedCountry(data);
  };

  useEffect(() => {
    if (curFilter.filter !== "country" || curFilter.filter !== "_country") {
      setSelectedCountry(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curFilter.filter]);

  return (
    <button
      onClick={setToggle}
      className={`relative flex items-center text-xs ${
        curFilter.filter === "country" || curFilter.filter === "_country"
          ? "bg-blue-100 hover:bg-blue-200 dark:bg-blue-200 dark:hover:bg-blue-300"
          : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-500 dark:hover:bg-gray-600"
      }  p-2 py-1.5 rounded-[6px] cursor-pointer`}
    >
      {selectedCountry && (
        <span className="text-sm font-emoji">{selectedCountry.flag_code}</span>
      )}
      <span className="pl-1.5 pr-1 text-xs whitespace-nowrap">
        {!selectedCountry ? "All countries" : selectedCountry.country_name}
      </span>
      <span className={toggle ? "rotate-180" : ""}>
        <GoChevronDown />
      </span>

      {/* Dropdown */}
      {toggle && (
        <DropdownContainer extraStyles="text-left translate-x-[50%] xs:translate-x-0">
          <li
            onClick={() => handleSelect(null)}
            className={`flex items-center p-1 pt-1.5 pb-1 pr-8 border-b border-[#f2f2f2] cursor-pointer hover:text-gray-500`}
            role="option"
          >
            <span className="pl-8 text-[10px]">All countries</span>
          </li>
          {countries.map((data, idx) => (
            <li
              key={data.country_name + idx}
              onClick={() => handleSelect(data)}
              className={`flex items-center p-1 pr-8 cursor-pointer hover:text-gray-500 ${
                idx !== countries.length - 1 ? "border-b border-[#f2f2f2]" : ""
              }`}
              role="option"
            >
              <span className="text-sm font-emoji">{data.flag_code}</span>
              <span className="pl-4 text-[10px] whitespace-nowrap">
                {data.country_name}
              </span>
            </li>
          ))}
        </DropdownContainer>
      )}
    </button>
  );
};

export default CountryFilter;
