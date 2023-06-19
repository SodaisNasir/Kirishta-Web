import { VscClose } from "react-icons/vsc";
import { typeCheck } from "../../utils";
import {
  CountryField,
  DeviceField,
  FeaturedField,
  PlatformField,
  RoleField,
  StatusField,
  TextArea,
  UploadField,
} from "../Form Fields";
import { useState } from "react";
import Loader from "../Loaders/Loader";

export const ViewModal = ({ viewModal, setViewModal }) => {
  const keys = Object.keys(viewModal.data).filter(
    (e) => e !== "_media" && e !== "_dependants"
  );
  const data = viewModal.data;

  const close = () => setViewModal((prev) => ({ ...prev, isVisible: false }));

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
                      elem.includes("Problem Statement") ||
                      elem.includes("Situation Suggestion") ||
                      elem.includes("Proposed Outcome") ||
                      elem.includes("Response") ||
                      elem.includes("Feedback") ||
                      elem.includes("Report Details")
                        ? "col-span-6"
                        : "col-span-6 sm:col-span-3"
                    } flex flex-col justify-center p-2 border rounded-md bg-gray-50`}
                  >
                    <p className="block mb-1.5 text-sm font-semibold text-gray-900 dark:text-white capitalize">
                      {elem.replace("_", " ")}
                    </p>
                    <p
                      className={`block font-medium ${
                        elem === "flag_code" ? "font-emoji" : "text-xs"
                      } text-gray-700 dark:text-white`}
                    >
                      {typeof data[elem] === "string" &&
                      elem.includes("image") ? (
                        <img className="h-10" src={data[elem]} alt="cover" />
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

export const ReplyModal = ({ setReplyModal }) => {
  const close = () => setReplyModal((prev) => ({ ...prev, isVisible: false }));

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
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
              data-modal-hide="editUserModal"
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
              className="w-full text-sm text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export const NotificationModal = ({ setNotificationModal }) => {
  const close = () =>
    setNotificationModal((prev) => ({ ...prev, isVisible: false }));

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
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
              className="w-full text-sm text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send
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
}) => {
  const initial_state = editModal.data;
  const [toggleBtn, setToggleBtn] = useState(false);
  const [state, setState] = useState(initial_state);
  console.log(state);

  const keys = Object.keys(initial_state).filter((e) => e !== "id");

  const setValue = (key, val) => setState((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleBtn(true);

    try {
      let formdata = new FormData();
      keys.forEach((key) => formdata.append(key, state[key]));

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
        console.log(json.success.data);
        const data = keys.includes("image")
          ? { ...state, image: json.success.data.image }
          : state;
        setEditModal({ data, isVisible: false });
        setData((prev) => prev.map((e) => (e.id === data.id ? data : e)));
        setPaginatedData((prev) => ({
          ...prev,
          items: prev.items.map((e) => (e.id === data.id ? data : e)),
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

                  if (key.includes("device"))
                    return (
                      <DeviceField
                        {...{
                          key: elem,
                          title: key,
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
                  else if (
                    key.includes("country_name") &&
                    !keys.includes("flag_code")
                  )
                    return (
                      <CountryField
                        {...{
                          key: elem,
                          title: key,
                          state: state[key],
                          setState: (val) => setValue(key, val),
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
                  else if (key.includes("description"))
                    return (
                      <TextArea
                        {...{
                          elem,
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );

                  return (
                    <div key={elem}>
                      <label
                        htmlFor={elem.toLowerCase()}
                        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize"
                      >
                        {elem.replace("_", " ")}
                      </label>
                      <input
                        type={type}
                        name={elem.toLowerCase()}
                        id={elem.toLowerCase()}
                        value={state[elem]}
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
                          elem.toLowerCase().includes("flag_code")
                            ? "e.g. 🇧🇸"
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
}) => {
  const initial_state = createNewModal.data;
  const [toggleBtn, setToggleBtn] = useState(false);
  const [state, setState] = useState(initial_state);
  console.log(state);

  const keys = Object.keys(initial_state).filter((e) => e !== "id");

  const setValue = (key, val) => setState((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleBtn(true);

    try {
      let formdata = new FormData();
      keys.forEach((key) => formdata.append(key.replace(/^_/, ""), state[key]));

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
        const data = keys.includes("image")
          ? {
              ...state,
              id: json.success.data.id,
              image: json.success.data.image,
            }
          : { ...state, id: json.success.data.id };
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
                  const type = typeCheck(elem);
                  const key = elem;

                  if (key.includes("device"))
                    return (
                      <DeviceField
                        {...{
                          key: elem,
                          title: key,
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
                  else if (
                    key.includes("country_name") &&
                    !keys.includes("flag_code")
                  )
                    return (
                      <CountryField
                        {...{
                          key: elem,
                          title: key,
                          state: state[key],
                          setState: (val) => setValue(key, val),
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
                          fileRequired,
                        }}
                      />
                    );
                  else if (key.includes("description"))
                    return (
                      <TextArea
                        {...{
                          elem,
                          key: elem,
                          state: state[key],
                          setState: (val) => setValue(key, val),
                        }}
                      />
                    );

                  return (
                    <div key={elem}>
                      <label
                        htmlFor={elem}
                        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize"
                      >
                        {elem.replace("_", " ")}
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
                          elem.includes("flag_code") ? "e.g. 🇧🇸" : ""
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
