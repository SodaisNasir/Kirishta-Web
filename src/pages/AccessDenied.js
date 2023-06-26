import React from "react";
import { FaLock } from "react-icons/fa";

const AccessDenied = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <FaLock className="text-6xl text-blue-500" />
      <h1 className="mt-2">You don't have access to this page!</h1>
    </div>
  );
};

export default AccessDenied;
