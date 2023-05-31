import React from "react";
import Router from "./routes";
import { ContextProvider } from "./context";

function App() {
  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  );
}

export default App;
