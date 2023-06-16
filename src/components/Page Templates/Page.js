import React, { useEffect } from "react";

const Page = ({ title, extraClasses = "", children }) => {
  useEffect(() => {
    document.title = title + " - Kirista";
  }, []);

  return (
    <div className={`font-poppins p-3 py-2 md:py-9 md:px-5 ${extraClasses}`}>
      <header>
        <h1 className="font-semibold text-xl text-[#0A1A34]">{title}</h1>
      </header>
      {children}
    </div>
  );
};

export default Page;
