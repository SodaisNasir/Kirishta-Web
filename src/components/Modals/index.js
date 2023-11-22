import { VscClose } from "react-icons/vsc";
import { RiErrorWarningFill } from "react-icons/ri";
import { typeCheck } from "../../utils";
import {
  DateField,
  DeviceField,
  FAQLanguageField,
  FeaturedField,
  GeneralCountryField,
  LanguageField,
  MapField,
  ParishCategoriesField,
  ParishCountriesField,
  ParishProvincesField,
  ParishRegionsField,
  PlatformField,
  PopupAppPage,
  RoleField,
  StatusField,
  TextArea,
  TimeField,
  UploadField,
} from "../Form Fields";
import { useEffect, useState } from "react";
import Loader from "../Loaders/Loader";

export const ViewModal = ({ viewModal, setViewModal, page, books }) => {
  const keys = Object.keys(viewModal.data);
  const data = viewModal.data;

  const close = () => setViewModal((prev) => ({ ...prev, isVisible: false }));

  const mapProperty = (data) => {
    let json = typeof data === "string" ? JSON.parse(data) : data;
    json = typeof json === "string" ? JSON.parse(json) : json;

    //* console.log(data, json);
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
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">View</h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center"
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
                      elem.includes("about") ||
                      elem.includes("address") ||
                      elem.includes("Response") ||
                      elem.includes("Feedback")
                        ? "col-span-6"
                        : "col-span-6 sm:col-span-3"
                    } flex flex-col justify-center p-2 border rounded-md bg-gray-50`}
                  >
                    <p className="block mb-1.5 text-sm font-semibold text-gray-900 capitalize">
                      {elem === "_created_at"
                        ? "Date/Time"
                        : elem === "app_page"
                        ? "Web Link"
                        : elem.replaceAll("_", " ")}
                    </p>
                    <p
                      className={`block font-medium ${
                        elem === "flag_code" ? "font-emoji" : "text-xs"
                      } text-gray-700`}
                    >
                      {typeof data[elem] === "string" &&
                      elem.includes("image") ? (
                        <img className="h-10" src={data[elem]} alt="cover" />
                      ) : elem === "start_date" || elem === "_end_date" ? (
                        data[elem].replace(/ ?00:00:00/, "")
                      ) : elem === "book_name" && data[elem] ? (
                        books.filter((e) => e.id == data[elem])[0].title
                      ) : elem === "_created_at" ? (
                        data[elem].replace("T", " ").replace(/.0*Z/, "")
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
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
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
        //* console.log("ReplyModal =============>", json);
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
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">Reply</h3>
            <button
              onClick={close}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center"
            >
              <VscClose />
            </button>
          </div>
          {/* Modal content */}
          <div className="grid grid-cols-1 gap-4 p-5 overflow-y-scroll">
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="Write message here..."
                required={true}
              ></textarea>
            </div>
          </div>

          {/* Modal footer */}
          <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b">
            <button
              type="submit"
              className="flex justify-center items-center w-full text-sm text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
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

    //* console.log(
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
        //* console.log("NotificationModal =============>", json);
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
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Push Notification
            </h3>
            <button
              onClick={close}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center"
            >
              <VscClose />
            </button>
          </div>
          {/* Modal content */}
          <div className="grid grid-cols-1 gap-4 p-5 overflow-y-scroll">
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="Write message here..."
                required={true}
              ></textarea>
            </div>
          </div>

          {/* Modal footer */}
          <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b">
            <button
              type="submit"
              className="flex items-center justify-center w-full text-sm text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
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

export const ConfirmationModal = ({
  // confimationModal,
  setConfimationModal,
  onSubmit,
}) => {
  const close = () => setConfimationModal(false);

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
        <div className="relative w-full max-w-md max-h-full bg-gray-100 border rounded-lg shadow-md pointer-events-auto">
          <button
            onClick={close}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 ml-auto inline-flex justify-center items-center"
          >
            <VscClose />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <RiErrorWarningFill className="mx-auto mb-2 text-6xl text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure about this?
            </h3>
            <button
              autoFocus={true}
              onClick={onSubmit}
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes
            </button>
            <button
              onClick={close}
              className="text-gray-500 bg-white hover:bg-gray-50 focus:border-gray-400 focus:outline-none rounded-lg border-2 border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              No
            </button>
          </div>
        </div>
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
//           <div className="flex items-start justify-between p-4 border-b rounded-t">
//             <h3 className="text-xl font-semibold text-gray-900">
//               Media
//             </h3>
//             <button
//               onClick={close}
//               type="button"
//               className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center
//             >
//               <VscClose />
//             </button>
//           </div>
//           {/* Modal content */}
//           <div className="overflow-y-scroll h-[50vh] p-2">
//             <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
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
//           <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
//             <button
//               onClick={close}
//               className="w-full px-5 py-3 text-xs font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-200"
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
  roles,
  languages,
  books,
}) => {
  const initial_state = editModal.data;
  const [toggleBtn, setToggleBtn] = useState(false);
  const [state, setState] = useState(initial_state);
  const [curParishRegions, setCurParishRegions] = useState(parishRegions);
  const [curParishProvinces, setCurParishProvinces] = useState(parishProvinces);
  const [radio, setRadio] = useState(
    initial_state.app_page ? "app_page" : "book_name"
  );

  //* console.log("state", state);

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
          const isStateString = typeof state[key] === "string";
          const mapValues = isStateString ? JSON.parse(state[key]) : state[key];
          const latitude = mapValues.latitude;
          const longitude = mapValues.longitude;

          formdata.append("map", `${latitude || ""},${longitude || ""}`);
        } else if (key === "start_date" || key === "_end_date") {
          formdata.append(
            key.replace(/^_/, ""),
            state[key].replace(/ ?00:00:00/, "")
          );
        } else if (key === "start_time" || key === "_end_time") {
          formdata.append(
            key.replace(/^_/, ""),
            state[key]?.toLowerCase().includes("am") ||
              state[key]?.toLowerCase().includes("pm")
              ? state[key]
              : new Date("1970-01-01T" + state[key]).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }
                )
          );
        } else {
          formdata.append(key.replace(/^_/, ""), state[key] || "");
          //* key === "app_page" && console.log("state[key]", state[key]);
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

      //* console.log("json =====>", json);

      if (json.success) {
        const updatedData =
          page === "Popup Promotion" ? json.success.popup : json.success.data;
        let data = { ...state };
        updatedData &&
          Object.keys(data).forEach(
            (key) =>
              (data[key] =
                key === "image" && page === "Popup Promotion"
                  ? updatedData[key.replace(/^_/, "")] ||
                    updatedData["cover_image"]
                  : updatedData[key.replace(/^_/, "")])
          );

        //* console.log("response =============>", updatedData);

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

  useEffect(() => {
    const func = () => {
      setState((prev) => ({ ...prev, _region: "", _province: "" }));
      initial_state.country = "";
    };

    if (page === "Parish Management") {
      setCurParishRegions(
        parishRegions.filter(
          (e) => e.country.toLowerCase() === state.country.toLowerCase()
        )
      );

      // for preventing region and province value change when this useEffect runs for the first time.
      initial_state.country !== state.country && func();
    }
  }, [state.country]);

  useEffect(() => {
    if (page === "Parish Management") {
      setCurParishProvinces(
        parishProvinces.filter(
          (e) => e.region.toLowerCase() === state._region.toLowerCase()
        )
      );
    }
  }, [state._region, state.country]);

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
            className="relative bg-white rounded-lg shadow"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">Edit</h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center"
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
                  if (page === "Popup Promotion" && key.includes("book_name"))
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
                  else if (
                    key.includes("app_page") &&
                    page === "Popup Promotion"
                  )
                    return (
                      <PopupAppPage
                        {...{
                          key: elem,
                          state: state[radio],
                          setState: (val) => setValue(radio, val),
                          radio,
                          setRadio: (val) => {
                            setRadio(val);

                            if (val === "app_page") {
                              setValue("book_name", "");
                            } else if (val === "book_name") {
                              setValue("app_page", "");
                            }
                          },
                          books,
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
                          parishProvinces: curParishProvinces,
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
                          parishRegions: curParishRegions,
                        }}
                      />
                    );
                  else if (key === "start_date" || key === "_end_date")
                    return (
                      <DateField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          title: key,
                          required: false,
                        }}
                      />
                    );
                  else if (key === "start_time" || key === "_end_time")
                    return (
                      <TimeField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          title: key,
                          required: false,
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
                    page === "FAQ Management"
                  )
                    return (
                      <FAQLanguageField
                        {...{
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                          disabled: true,
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
                          languages,
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
                          roles,
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
                        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
                      >
                        {elem === "_map"
                          ? "Map (lat-long)"
                          : elem === "app_page"
                          ? "Web Link"
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
                        } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full`}
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
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
              <button
                type="submit"
                className="flex items-center justify-center w-full px-5 py-3 text-xs font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
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
  roles,
  languages,
  books,
}) => {
  const initial_state = createNewModal.data;
  const [toggleBtn, setToggleBtn] = useState(false);
  const [radio, setRadio] = useState("app_page");
  const [state, setState] = useState(initial_state);
  const [curParishRegions, setCurParishRegions] = useState(parishRegions);
  const [curParishProvinces, setCurParishProvinces] = useState(parishProvinces);

  //* console.log("state ========>", state, radio);

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
          //* console.log("map2 ======> ",`${state[key].latitude},${state[key].longitude}`);
        } else if (key === "start_date" || key === "_end_date") {
          formdata.append(
            key.replace(/^_/, ""),
            state[key].replace(/ ?00:00:00/, "")
          );
        } else if (key === "start_time" || key === "_end_time") {
          formdata.append(
            key.replace(/^_/, ""),
            state[key]?.toLowerCase().includes("am") ||
              state[key]?.toLowerCase().includes("pm")
              ? state[key]
              : new Date("1970-01-01T" + state[key]).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }
                )
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

      //* console.log(json);

      if (json.success) {
        const updatedData =
          page === "Popup Promotion" ? json.success.popup : json.success.data;
        let data = { id: null, ...state };
        updatedData &&
          Object.keys(data).forEach(
            (key) =>
              (data[key] =
                updatedData[key.replace(/^_/, "")] ||
                (page === "Popup Promotion" && null))
          );

        //* console.log("createNewModal =============>", data);

        setData((prev) => [data, ...prev]);
        setPaginatedData((prev) => ({
          ...prev,
          items: [data, ...prev.items],
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

  useEffect(() => {
    const func = () => {
      setState((prev) => ({ ...prev, _region: "", _province: "" }));
      initial_state.country = "";
    };

    if (page === "Parish Management") {
      setCurParishRegions(
        parishRegions.filter(
          (e) => e.country.toLowerCase() === state.country.toLowerCase()
        )
      );

      // for preventing region and province value change when this useEffect runs for the first time.
      initial_state.country !== state.country && func();
    }
  }, [state.country]);

  useEffect(() => {
    if (page === "Parish Management") {
      setCurParishProvinces(
        parishProvinces.filter(
          (e) => e.region.toLowerCase() === state._region.toLowerCase()
        )
      );
    }
  }, [state._region, state.country]);

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
            className="relative bg-white rounded-lg shadow"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center"
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

                  if (key.includes("book_name") && page === "Popup Promotion")
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
                  else if (
                    key.includes("app_page") &&
                    page === "Popup Promotion"
                  )
                    return (
                      <PopupAppPage
                        {...{
                          key: elem,
                          state: state[radio],
                          setState: (val) => setValue(radio, val),
                          radio,
                          setRadio: (val) => {
                            setRadio(val);

                            if (val === "app_page") {
                              setValue("book_name", "");
                            } else if (val === "book_name") {
                              setValue("app_page", "");
                            }
                          },
                          books,
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
                          parishProvinces: curParishProvinces,
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
                          parishRegions: curParishRegions,
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
                    page === "FAQ Management"
                  )
                    return (
                      <FAQLanguageField
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
                          languages,
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
                          roles,
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
                        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
                      >
                        {elem === "_map"
                          ? "Map (lat-long)"
                          : elem === "app_page"
                          ? "Web Link"
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
                        } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full`}
                        placeholder={
                          elem.includes("flag_code")
                            ? "e.g. 🇧🇸"
                            : elem.includes("_map")
                            ? "5.3664-2.5464"
                            : ""
                        }
                        required={
                          (page === "Parish Management" ||
                            page === "Banner Promotion") &&
                          (elem.includes("email") ||
                            elem.includes("_website") ||
                            elem.includes("app_page"))
                            ? false
                            : true
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
              <button
                type="submit"
                className="flex items-center justify-center w-full px-5 py-3 text-xs font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
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
