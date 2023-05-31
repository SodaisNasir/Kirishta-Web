import React, { useState } from "react";
import Page from "../components/Page Templates/Page";
import { about } from "../constants/data";
import Editor from "../components/Editor";

const AboutRCCGStructure = () => {
  const [state, setState] = useState({ value: about });

  const handleChange = (value) => setState({ value });
  const handleSubmit = () => console.log(state.value);

  return (
    <Page title={"About RCCG Structure"}>
      <main>
        <div className="grid grid-cols-1 gap-5">
          <Editor {...{ state, handleChange }} />
        </div>
        <button
          onClick={handleSubmit}
          className="w-auto text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2 mt-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
      </main>
    </Page>
  );
};

export default AboutRCCGStructure;
