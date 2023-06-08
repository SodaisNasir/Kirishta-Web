import React from "react";
import Router from "./routes";
import { ContextProvider } from "./context";
import "react-quill/dist/quill.snow.css";

function App() {
  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  );
}

export default App;
