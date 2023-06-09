import React, { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import { privacyPolicy } from "../../constants/data";
import { LanguageSelector } from "../../components/helpers";

const PrivacyManagement = () => {
  const [state, setState] = useState({ value: privacyPolicy });
  const [language, setLanguage] = useState({ state: false, value: "English" });

  const handleChange = (value) => setState({ value });
  const handleSubmit = () => console.log(state.value);

  useEffect(() => {
    setState({ state: false, value: privacyPolicy[language.value] });
  }, [language.value]);

  return (
    <div className={`font-poppins p-3 pt-2 md:pt-9 md:px-5`}>
      <header className="flex justify-between">
        <h1 className="font-semibold text-xl text-[#44403C]">
          Privacy Policy Management
        </h1>

        <LanguageSelector
          {...{
            language,
            setLanguage,
          }}
        />
      </header>
      <main>
        <div className="grid grid-cols-1 gap-5">
          <Editor {...{ state: state.value, handleChange }} />
        </div>
        <button
          onClick={handleSubmit}
          className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2 mt-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
      </main>
    </div>
  );
};

export default PrivacyManagement;
