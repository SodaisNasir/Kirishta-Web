import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "../../index.css";

export const Editor = ({ state, handleChange }) => {
  return (
    <div className="pt-8">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Write here..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
