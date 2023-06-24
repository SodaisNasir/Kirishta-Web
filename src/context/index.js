/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [otpData, setOtpData] = useState(null);

  useEffect(() => {
    if (otpData) {
      setTimeout(() => {
        setOtpData(null);
      }, 100000);
    }
  }, [otpData]);

  return (
    <AppContext.Provider value={{ user, setUser, otpData, setOtpData }}>
      {children}
    </AppContext.Provider>
  );
};
