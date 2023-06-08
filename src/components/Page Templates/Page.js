import React from "react";

const Page = ({ title, extraClasses = "", children }) => {
  return (
    <div className={`font-poppins p-3 pt-2 md:pt-9 md:px-5 ${extraClasses}`}>
      <header>
        <h1 className="font-semibold text-xl text-[#0A1A34]">{title}</h1>
        {children}
      </header>
    </div>
  );
};

export default Page;
