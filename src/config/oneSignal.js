import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  window.OneSignal = window.OneSignal || [];
  OneSignal.set.push(function () {
    OneSignal.init({
      appId: "54b7926e-9b1f-4ba6-810c-97520670236f",
    });
  });
}
