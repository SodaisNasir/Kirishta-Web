import React from "react";
import Router from "./routes";
import { ContextProvider } from "./context";
import OneSignal from "react-onesignal";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [initialized, setInitialized] = useState(false);

  // useEffect(() => {
  //   // runOneSignal();
  //   console.log("render");
  //   !initialized &&
  //     OneSignal.init({
  //       appId: "54b7926e-9b1f-4ba6-810c-97520670236f",
  //       safari_web_id:
  //         "web.onesignal.auto.48d27e8c-5bf0-4f8f-a083-e09c208eb2cb",
  //       notifyButton: {
  //         enable: true,
  //       },
  //       subdomainName: "kirista",
  //     }).then(() => {
  //       setInitialized(true);
  //       OneSignal.showSlidedownPrompt().then(() => {
  //         // do other stuff
  //       });
  //     });
  // }, []);

  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  );
}

export default App;
