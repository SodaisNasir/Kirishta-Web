import { VscClose } from "react-icons/vsc";
import { typeCheck } from "../../utils";
import {
  DateField,
  DeviceField,
  FeaturedField,
  GeneralCountryField,
  LanguageField,
  MapField,
  ParishCategoriesField,
  ParishCountriesField,
  ParishProvincesField,
  ParishRegionsField,
  PlatformField,
  RoleField,
  StatusField,
  TextArea,
  TimeField,
  UploadField,
} from "../Form Fields";
import { useState } from "react";
import Loader from "../Loaders/Loader";

export const ViewModal = ({ viewModal, setViewModal, page }) => {
  const keys = Object.keys(viewModal.data).filter(
    (e) => e !== "_media" && e !== "_dependants"
  );
  const data = viewModal.data;

  const close = () => setViewModal((prev) => ({ ...prev, isVisible: false }));

  const mapProperty = (data) => {
    let json = typeof data === "string" ? JSON.parse(data) : data;
    json = typeof json === "string" ? JSON.parse(json) : json;

    console.log(data, json);
    return `${json.latitude} - ${json.longitude}`;
  };

  return (
    <>
      <div
        onClick={close}
        className={`${
          viewModal.isVisible ? "" : "hidden"
        } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`${
          viewModal.isVisible ? "" : "hidden"
        } fixed z-20 pointer-events-none flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full`}
      >
        <div className="relative w-full max-w-2xl max-h-full pointer-events-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                View
              </h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <VscClose />
              </button>
            </div>
            {/* Modal body */}
            <div className="p-5 space-y-6 max-h-[72vh] overflow-y-scroll">
              <div className="grid grid-cols-6 gap-3">
                {keys.map((elem) => (
                  <div
                    key={elem}
                    className={`${
                      elem.includes("Subject") ||
                      elem.includes("Comment") ||
                      (elem.includes("about") && page !== "Events Mangement") ||
                      elem.includes("address") ||
                      elem.includes("Response") ||
                      elem.includes("Feedback") ||
                      elem.includes("Report Details")
                        ? "col-span-6"
                        : "col-span-6 sm:col-span-3"
                    } flex flex-col justify-center p-2 border rounded-md bg-gray-50`}
                  >
                    <p className="block mb-1.5 text-sm font-semibold text-gray-900 dark:text-white capitalize">
                      {elem === "id" && page !== "Users Management"
                        ? "S/N"
                        : elem.replaceAll("_", " ")}
                    </p>
                    <p
                      className={`block font-medium ${
                        elem === "flag_code" ? "font-emoji" : "text-xs"
                      } text-gray-700 dark:text-white`}
                    >
                      {typeof data[elem] === "string" &&
                      elem.includes("image") ? (
                        <img className="h-10" src={data[elem]} alt="cover" />
                      ) : elem === "_map" ? (
                        mapProperty(data[elem])
                      ) : data[elem] === null ? (
                        "No data!"
                      ) : (
                        data[elem]
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={close}
                type="button"
                className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ReplyModal = ({ replyModal, setReplyModal, replyUrl }) => {
  const url = replyUrl + replyModal.id;
  const [message, setMessage] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  const close = () => setReplyModal({ message: "", isVisible: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleBtn(true);

    try {
      let formdata = new FormData();
      formdata.append("message", message);

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const json = await res.json();

      if (json.success.status == 200) {
        close();
        setToggleBtn(false);
        console.log("ReplyModal =============>", json);
      }
    } catch (err) {
      console.error(err);
      setToggleBtn(false);
    }
  };

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`fixed z-20 pointer-events-none flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-md max-h-full bg-gray-100 rounded-lg pointer-events-auto"
        >
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Reply
            </h3>
            <button
              onClick={close}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <VscClose />
            </button>
          </div>
          {/* Modal content */}
          <div className="grid grid-cols-1 gap-4 overflow-y-scroll p-5">
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write message here..."
                required={true}
              ></textarea>
            </div>
          </div>

          {/* Modal footer */}
          <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="submit"
              className="flex justify-center items-center w-full text-sm text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
              disabled={toggleBtn}
            >
              {toggleBtn ? (
                <>
                  <Loader extraStyles="!static !inset-auto !block !scale-50 !bg-transparent !saturate-100" />
                  Sending
                </>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export const NotificationModal = ({
  notificationModal,
  setNotificationModal,
  paginatedData,
  notificationUrl,
  notificationUrlBulk,
  selected,
  setSelected,
}) => {
  const isNotificationBulk = selected.length > 1;
  const url = isNotificationBulk
    ? notificationUrlBulk
    : notificationUrl + notificationModal.data.id;
  const [message, setMessage] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  const close = () => setNotificationModal({ message: "", isVisible: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleBtn(true);

    // console.log(
    //   "first",
    //   JSON.stringify(
    //     paginatedData.items
    //       .filter((e) => selected.includes(e.id))
    //       .map((e) => e.device_token)
    //   )
    // );

    try {
      let formdata = new FormData();
      formdata.append("message", message);
      isNotificationBulk &&
        formdata.append(
          "device_token",
          JSON.stringify(
            paginatedData.items
              .filter((e) => selected.includes(e.id))
              .map((e) => e.device_token)
          )
        );

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const json = await res.json();

      if (json.success) {
        close();
        console.log("NotificationModal =============>", json);
      }
    } catch (err) {
      console.error(err);
      setToggleBtn(false);
    }
  };

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full pointer-events-none`}
      >
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-md max-h-full bg-gray-100 rounded-lg pointer-events-auto"
        >
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Push Notification
            </h3>
            <button
              onClick={close}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <VscClose />
            </button>
          </div>
          {/* Modal content */}
          <div className="grid grid-cols-1 gap-4 overflow-y-scroll p-5">
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write message here..."
                required={true}
              ></textarea>
            </div>
          </div>

          {/* Modal footer */}
          <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="submit"
              className="flex items-center justify-center w-full text-sm text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
              disabled={toggleBtn}
            >
              {toggleBtn ? (
                <>
                  <Loader extraStyles="!static !inset-auto !block !scale-50 !bg-transparent !saturate-100" />
                  Sending
                </>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// export const MediaModal = ({ mediaModal, setMediaModal }) => {
//   const close = () => setMediaModal((prev) => ({ ...prev, isVisible: false }));

//   return (
//     <>
//       <div
//         onClick={close}
//         className={`fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
//       />
//       <div
//         tabIndex="-1"
//         className={`fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full pointer-events-none`}
//       >
//         <div className="relative w-full max-w-2xl max-h-full bg-gray-100 rounded-lg pointer-events-auto">
//           {/* Modal header */}
//           <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
//             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//               Media
//             </h3>
//             <button
//               onClick={close}
//               type="button"
//               className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
//             >
//               <VscClose />
//             </button>
//           </div>
//           {/* Modal content */}
//           <div className="overflow-y-scroll h-[50vh] p-2">
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
//               {mediaModal.media.map((url, indx) => (
//                 <div
//                   key={"media" + indx}
//                   className="flex justify-center items-center min-w-[50px] min-h-[125px] relative object-cover object-center bg-gray-300"
//                 >
//                   <Image classes={"w-full h-full"} url={url} alt={"media"} />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Modal footer */}
//           <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
//             <button
//               onClick={close}
//               className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-xs px-5 py-3 text-center"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

export const EditModal = ({
  editModal,
  setEditModal,
  editUrl,
  setPaginatedData,
  setData,
  gridCols = 2,
  statusType = "pending/resolved",
  canUploadMultipleImages = false,
  page,
  parishCategories,
  parishCountries,
  parishRegions,
  parishProvinces,
  generalCountries,
}) => {
  const initial_state = editModal.data;
  const [toggleBtn, setToggleBtn] = useState(false);
  const [state, setState] = useState(initial_state);

  console.log("state", state);

  const keys = Object.keys(initial_state).filter(
    (item) => item !== "id" && !item.includes("email_verified_at")
  );

  const setValue = (key, val) => setState((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleBtn(true);

    try {
      let formdata = new FormData();
      keys.forEach((key) => {
        if (key === "_map") {
          formdata.append(
            "map",
            `${state[key].latitude},${state[key].longitude}`
          );
          console.log(
            "map2 ======> ",
            `${state[key].latitude},${state[key].longitude}`
          );
        } else {
          formdata.append(key.replace("_", ""), state[key]);
        }
      });

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(`${editUrl}/${state.id}`, requestOptions);
      const json = await res.json();

      if (json.success.status == 200) {
        const updatedData = json.success.data;
        let data = { id: null, ...state };
        Object.keys(data).forEach(
          (key) => (data[key] = updatedData[key.replace(/^_/, "")])
        );

        console.log("EditModal =============>", data);

        setData((prev) =>
          prev.map((item) => (item.id === state.id ? data : item))
        );
        setPaginatedData((prev) => ({
          ...prev,
          items: prev.items.map((item) => (item.id === state.id ? data : item)),
        }));
      }
    } catch (err) {
      console.error(err);
      setToggleBtn(false);
    } finally {
      setEditModal({
        data: initial_state,
        isVisible: false,
      });
    }
  };

  const close = () => setEditModal((prev) => ({ ...prev, isVisible: false }));

  return (
    <>
      <div
        onClick={close}
        className={`${
          editModal.isVisible ? "" : "hidden"
        } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`${
          editModal.isVisible ? "" : "hidden"
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full pointer-events-none`}
      >
        <div
          className={`relative w-full ${
            gridCols === 1 ? "max-w-lg" : "max-w-2xl"
          } max-h-full pointer-events-auto`}
        >
          {/* Modal content */}
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow dark:bg-gray-700"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit
              </h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <VscClose />
              </button>
            </div>
            {/* Modal body */}
            <div className="p-5 space-y-6 max-h-[72vh] overflow-y-scroll">
              <div
                className={`grid ${
                  gridCols === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
                } gap-5`}
              >
                {keys.map((elem) => {
                  const type = typeCheck(elem);
                  const key = elem;

                  if (
                    page === "Users Management" &&
                    (key.includes("status") || key.includes("device"))
                  )
                    return;

                  if (key.includes("device"))
                    return (
                      <DeviceField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );
                  else if (key.includes("featured"))
                    return (
                      <FeaturedField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );
                  else if (
                    key.includes("province") &&
                    page !== "Provinces Management"
                  )
                    return (
                      <ParishProvincesField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          parishProvinces,
                        }}
                      />
                    );
                  else if (
                    key.includes("category") &&
                    page === "Parish Countries"
                  )
                    return (
                      <ParishCategoriesField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          parishCategories,
                        }}
                      />
                    );
                  else if (
                    key.includes("country") &&
                    page !== "General Countries" &&
                    page !== "Parish Countries"
                  )
                    return page === "Regions Management" ||
                      page === "Parish Management" ? (
                      <ParishCountriesField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          parishCountries,
                        }}
                      />
                    ) : (
                      <GeneralCountryField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          generalCountries,
                        }}
                      />
                    );
                  else if (
                    key.includes("region") &&
                    (page === "Provinces Management" ||
                      page === "Parish Management")
                  )
                    return (
                      <ParishRegionsField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          parishRegions,
                        }}
                      />
                    );
                  else if (key === "start_date" || key === "end_date")
                    return (
                      <DateField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          title: key,
                        }}
                      />
                    );
                  else if (key === "start_time" || key === "end_time")
                    return (
                      <TimeField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          title: key,
                        }}
                      />
                    );
                  else if (key.includes("map"))
                    return (
                      <MapField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );
                  else if (key.includes("platform"))
                    return (
                      <PlatformField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );
                  else if (
                    key.includes("language") &&
                    page !== "Book Languages"
                  )
                    return (
                      <LanguageField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );
                  else if (key.includes("status"))
                    return (
                      <StatusField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          statusType,
                        }}
                      />
                    );
                  else if (key.includes("role"))
                    return (
                      <RoleField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );
                  else if (key.includes("media") || key.includes("image"))
                    return (
                      <UploadField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          canUploadMultipleImages,
                        }}
                      />
                    );
                  else if (
                    key.includes("description") ||
                    key.includes("about") ||
                    key.includes("answer")
                  )
                    return (
                      <TextArea
                        {...{
                          elem,
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          gridCols,
                        }}
                      />
                    );

                  return (
                    <div key={elem}>
                      <label
                        htmlFor={elem.toLowerCase()}
                        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize"
                      >
                        {elem === "_map"
                          ? "Map (lat-long)"
                          : elem.replaceAll("_", " ")}
                      </label>
                      <input
                        type={type}
                        name={elem.toLowerCase()}
                        id={elem.toLowerCase()}
                        value={state[elem] || ""}
                        onChange={(e) =>
                          setState((prev) => ({
                            ...prev,
                            [elem]: e.target.value,
                          }))
                        }
                        className={`${
                          elem.toLowerCase().includes("flag_code")
                            ? "font-emoji text-xl p-2.5 py-1"
                            : "p-2.5 text-xs"
                        } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder={
                          elem.includes("flag_code")
                            ? "e.g. 🇧🇸"
                            : elem.includes("_map")
                            ? "5.3664-2.5464"
                            : ""
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="flex items-center justify-center w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
                disabled={toggleBtn}
              >
                {toggleBtn ? (
                  <>
                    <Loader extraStyles="!static !inset-auto !block !scale-50 !bg-transparent !saturate-100" />
                    Updating
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export const CreateNewModal = ({
  createNewModal,
  setCreateNewModal,
  setPaginatedData,
  setData,
  createUrl,
  gridCols = 2,
  title = "Create new",
  statusType = "pending/resolved",
  canUploadMultipleImages = false,
  fileRequired = true,
  page,
  parishCategories,
  parishCountries,
  parishRegions,
  parishProvinces,
  generalCountries,
}) => {
  const initial_state = createNewModal.data;
  const [toggleBtn, setToggleBtn] = useState(false);
  const [state, setState] = useState(initial_state);

  console.log("state ========>", state);

  const keys = Object.keys(initial_state).filter((e) => e !== "id");

  const setValue = (key, val) => setState((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleBtn(true);

    try {
      let formdata = new FormData();
      keys.forEach((key) => {
        if (key === "_map") {
          formdata.append(
            "map",
            `${state[key].latitude},${state[key].longitude}`
          );
          console.log(
            "map2 ======> ",
            `${state[key].latitude},${state[key].longitude}`
          );
        } else {
          formdata.append(key.replace(/^_/, ""), state[key]);
        }
      });

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(createUrl, requestOptions);
      const json = await res.json();

      console.log(json);

      if (json.success.status == 200) {
        const updatedData = json.success.data;
        let data = { id: null, ...state };
        Object.keys(data).forEach(
          (key) => (data[key] = updatedData[key.replace(/^_/, "")])
        );

        console.log("createNewModal =============>", data);

        setData((prev) => [...prev, data]);
        setPaginatedData((prev) => ({
          ...prev,
          items: [...prev.items, data],
        }));
      }
    } catch (err) {
      console.error(err);
      setToggleBtn(false);
    } finally {
      setCreateNewModal({
        data: initial_state,
        isVisible: false,
      });
    }
  };

  const close = () =>
    setCreateNewModal((prev) => ({ ...prev, isVisible: false }));

  return (
    <>
      <div
        onClick={close}
        className={`${
          createNewModal.isVisible ? "" : "hidden"
        } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`${
          createNewModal.isVisible ? "" : "hidden"
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full pointer-events-none`}
      >
        <div
          className={`relative w-full ${
            gridCols === 1 ? "max-w-lg" : "max-w-2xl"
          } max-h-full pointer-events-auto`}
        >
          {/* Modal content */}
          <form
            action="#"
            onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow dark:bg-gray-700"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <VscClose />
              </button>
            </div>
            {/* Modal body */}
            <div className="p-5 space-y-6 max-h-[72vh] overflow-y-scroll">
              <div
                className={`grid ${
                  gridCols === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
                } gap-5`}
              >
                {keys.map((elem) => {
                  const type = typeCheck(elem, page);
                  const key = elem;

                  if (key.includes("device"))
                    return (
                      <DeviceField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );
                  else if (key.includes("featured"))
                    return (
                      <FeaturedField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );
                  else if (
                    key.includes("province") &&
                    page !== "Provinces Management"
                  )
                    return (
                      <ParishProvincesField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          parishProvinces,
                        }}
                      />
                    );
                  else if (
                    key.includes("category") &&
                    page === "Parish Countries"
                  )
                    return (
                      <ParishCategoriesField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          parishCategories,
                        }}
                      />
                    );
                  else if (
                    key.includes("country") &&
                    page !== "General Countries" &&
                    page !== "Parish Countries"
                  )
                    return page === "Regions Management" ||
                      page === "Parish Management" ? (
                      <ParishCountriesField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          parishCountries,
                        }}
                      />
                    ) : (
                      <GeneralCountryField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          generalCountries,
                        }}
                      />
                    );
                  else if (
                    key.includes("region") &&
                    (page === "Provinces Management" ||
                      page === "Parish Management")
                  )
                    return (
                      <ParishRegionsField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          parishRegions,
                        }}
                      />
                    );
                  else if (key.includes("map"))
                    return (
                      <MapField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );
                  else if (key.includes("platform"))
                    return (
                      <PlatformField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );
                  else if (
                    key.includes("language") &&
                    page !== "Book Languages"
                  )
                    return (
                      <LanguageField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );
                  else if (key.includes("status"))
                    return (
                      <StatusField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          statusType,
                        }}
                      />
                    );
                  else if (key.includes("role"))
                    return (
                      <RoleField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );
                  else if (key.includes("media") || key.includes("image"))
                    return (
                      <UploadField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          fileRequired: true,
                          canUploadMultipleImages,
                        }}
                      />
                    );
                  else if (
                    key.includes("description") ||
                    key.includes("about") ||
                    key.includes("answer")
                  )
                    return (
                      <TextArea
                        {...{
                          elem,
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          gridCols,
                        }}
                      />
                    );

                  return (
                    <div key={elem}>
                      <label
                        htmlFor={elem}
                        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize"
                      >
                        {elem === "_map"
                          ? "Map (lat-long)"
                          : elem.replaceAll("_", " ")}
                      </label>
                      <input
                        type={type}
                        name={elem}
                        id={elem}
                        value={state[elem]}
                        onChange={(e) =>
                          setState((prev) => ({
                            ...prev,
                            [elem]: e.target.value,
                          }))
                        }
                        className={`${
                          elem.includes("flag_code")
                            ? "font-emoji text-xl p-2.5 py-1"
                            : "p-2.5 text-xs"
                        } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder={
                          elem.includes("flag_code")
                            ? "e.g. 🇧🇸"
                            : elem.includes("_map")
                            ? "5.3664-2.5464"
                            : ""
                        }
                        required={true}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="flex items-center justify-center w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
                disabled={toggleBtn}
              >
                {toggleBtn ? (
                  <>
                    <Loader extraStyles="!static !inset-auto !block !scale-50 !bg-transparent !saturate-100" />
                    Creating
                  </>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
