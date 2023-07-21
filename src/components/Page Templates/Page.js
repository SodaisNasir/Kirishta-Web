import React, { useEffect, useState } from "react";
import { Account } from "../helpers";

const Page = ({ title, extraClasses = "", children }) => {
  const [toggleAccount, setToggleAccount] = useState(false);

  useEffect(() => {
    document.title = title + " - Kirista";
  }, []);

  return (
    <div className={`font-poppins p-3 py-2 md:py-9 md:px-5 ${extraClasses}`}>
      <header className="flex justify-between items-center mb-3">
        <h1 className="font-semibold text-xl text-[#0A1A34] truncate mr-4">
          {title}
        </h1>
        <Account {...{ toggle: toggleAccount, setToggle: setToggleAccount }} />
      </header>
      {children}
    </div>
  );
};

export default Page;
