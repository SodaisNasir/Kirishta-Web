/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ReactCodeInput from "react-verification-code-input-2";
// import { useConfirmationCodeInput } from "react-confirmation-code-input";

const ConfirmationCodeFeilds = ({ fields, type, autoFocus, onChange }) => {
  //   const {
  //     refs,
  //     value: inputs,
  //     inputProps,
  //   } = useConfirmationCodeInput({
  //     length,
  //     allowedPattern,
  //     initialValue,
  //     autoFocus,
  //     // onChange: handleChange,
  //   });

  return (
    <div className="flex items-center justify-center">
      {/* {refs.map((ref, index) => (
        <input
          className="w-10 text-center bg-gray-50 border border-gray-300 text-gray-900 m-1.5 text-xs rounded-lg outline-none focus:ring-blue-600 focus:border-blue-600 inline-block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          key={index}
          // onChange={(e) => handleChange(e.target.value, index)}
          value={inputs[index]}
          ref={ref}
          // required={true}
          {...inputProps}
        />
      ))} */}
      <ReactCodeInput
        {...{
          type,
          fields,
          autoFocus,
          fieldHeight: 45,
          fieldWidth: 50,
          required: true,
          onChange,
          className: "mt-3",
        }}
      />
    </div>
  );
};

export default ConfirmationCodeFeilds;
