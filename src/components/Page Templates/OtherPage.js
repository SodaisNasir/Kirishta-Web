import React, { useEffect } from "react";

const OtherPage = ({ title, extraClasses = "", children }) => {
  useEffect(() => {
    document.title = title + " - Kirista";
  }, []);

  return <div className={`font-poppins ${extraClasses}`}>{children}</div>;
};

export default OtherPage;
