import { useState } from "react";
import { AiFillEye, AiFillFileImage, AiFillFolderOpen } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillCloudUploadFill } from "react-icons/bs";
import { CgUnblock } from "react-icons/cg";
import { FaReplyAll } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import {
  MdBlock,
  MdDelete,
  MdModeEdit,
  MdNotificationAdd,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { DropdownContainer } from "./helpers";
import Loader from "./Loaders/Loader";
import { toast } from "react-hot-toast";
import { base_url } from "../utils/url";

const Actions = ({
  page,
  hasDeleteAccess,
  hasEditAccess,
  actionCols,
  tableStructure,
  deleteUrl,
  data,
  setData,
  id,
  selectedUsers,
  setSelectedUsers,
  paginatedData,
  setPaginatedData,
  setEditModal,
  setReplyModal,
  setNotificationModal,
  setMediaModal,
  setViewModal,
  setIsViewerOpen,
  statusChangeUrl,
  setSavedBooks,
}) => {
  const navigate = useNavigate();
  const [blockUser, setBlockUser] = useState(
    data?.status?.toLowerCase() == "inactive"
  );
  const [toggleBlockBtn, setToggleBlockBtn] = useState(false);

  const handleBlock = async () => {
    setToggleBlockBtn(true);

    try {
      const requestOptions = {
        headers: {
          accept: "application/json",
        },
        method: "POST",
        redirect: "follow",
      };
      const res = await fetch(
        `https://sassolution.org/kirista/api/block/${id}`,
        requestOptions
      );
      const json = await res.json();
      console.log("data =======>", data);

      if (json.success) {
        const data = json;
        setBlockUser(!blockUser);
        setPaginatedData({
          ...paginatedData,
          items: paginatedData.items.map((user) =>
            user.id == id
              ? {
                  ...user,
                  status:
                    user.status.toLowerCase() === "active"
                      ? "InActive"
                      : "Active",
                }
              : user
          ),
        });
        setData((prev) =>
          prev.map((user) =>
            user.id == id
              ? {
                  ...user,
                  status:
                    user.status.toLowerCase() === "active"
                      ? "InActive"
                      : "Active",
                }
              : user
          )
        );
        console.log("block/unblock data =======>", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggleBlockBtn(false);
    }
  };

  const handlePublish = async () => {
    try {
      let formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("id", data.id);
      formdata.append("author", data.author);
      formdata.append("cover_image", data.cover_image);
      formdata.append("category", data.category);
      formdata.append("release_year", data.release_year);
      formdata.append("language", data.language);
      formdata.append("about", data.about);
      formdata.append("status", "ACTIVE");
      formdata.append("download", data.download || 0);
      formdata.append("read", data.read || 0);
      formdata.append("featured", data.featured);
      formdata.append("country", data.country);

      console.log("data", data);

      const requestOptions = {
        headers: {
          accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      const res = await fetch(
        `${base_url}/update-publish/${id}`,
        requestOptions
      );
      const json = await res.json();
      console.log("json =======>", json);

      if (json.success) {
        setSavedBooks((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggleBlockBtn(false);
    }
  };

  const remove = async () => {
    if (!hasDeleteAccess)
      return toast.error("You don't have access to delete on this page!", {
        duration: 2000,
      });

    try {
      const requestOptions = {
        headers: {
          accept: "application/json",
        },
        method: "POST",
        redirect: "follow",
      };
      const res = await fetch(`${deleteUrl}/${id}`, requestOptions);
      const json = await res.json();

      if (json.success) {
        setData((prev) => prev.filter((e) => e.id !== id));
        setPaginatedData((prev) => ({
          ...prev,
          items: prev.items.filter((e) => e.id !== id),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const redirect = () => navigate("/users-management/user-details/" + data._id);

  return (
    <>
      {actionCols.includes("status") && (
        <td className="text-center text-xs px-6 py-4">
          <StatusDropdown
            {...{
              id,
              value: data._status || data.status,
              statusChangeUrl,
              setPaginatedData,
              setData,
            }}
          />
        </td>
      )}
      {actionCols.includes("Details") && (
        <td className="text-center text-base px-6 py-4">
          <button
            onClick={redirect}
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            <BsBoxArrowUpRight />
          </button>
        </td>
      )}
      {actionCols.includes("View") && (
        <td className="text-center text-base px-6 py-4">
          <button
            onClick={() => setViewModal({ isVisible: true, data })}
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            <AiFillEye />
          </button>
        </td>
      )}
      {actionCols.includes("Submit") && (
        <td className="text-center text-lg px-6 py-4">
          <button
            onClick={() => alert("clicked on submit.")}
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            <IoIosSend />
          </button>
        </td>
      )}
      {actionCols.includes("Actions") && (
        <td className="flex text-center text-base px-6 py-4">
          <button className="text-xs mr-1 hover:text-blue-500 hover:underline font-medium text-gray-600 dark:text-gray-500">
            Yes
          </button>
          <span className="text-base text-gray-800"> | </span>
          <button className="text-xs mx-1 hover:text-blue-500 hover:underline font-medium text-gray-600 dark:text-gray-500">
            No
          </button>
          <span className="text-base text-gray-800"> | </span>
          <button className="text-xs ml-1 hover:text-blue-500 hover:underline font-medium text-gray-600 dark:text-gray-500">
            Maybe
          </button>
        </td>
      )}
      {actionCols.includes("Images") && (
        <td className="text-center text-base px-6 py-4">
          <button
            onClick={() =>
              setIsViewerOpen({ isVisible: true, images: data._images })
            }
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            <AiFillFileImage />
          </button>
        </td>
      )}
      {(actionCols.includes("Media") || actionCols.includes("Media Files")) && (
        <td className="text-center text-base px-6 py-4">
          <button
            onClick={() =>
              setMediaModal({ isVisible: true, media: data._media })
            }
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            <AiFillFolderOpen />
          </button>
        </td>
      )}
      {actionCols.includes("Reply") && (
        <td className="text-center text-base px-6 py-4">
          <button
            onClick={() =>
              setReplyModal((prev) => ({
                ...prev,
                isVisible: true,
                id: data.id,
              }))
            }
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            <FaReplyAll />
          </button>
        </td>
      )}
      {actionCols.includes("Push Notification") && (
        <td className="text-center text-base px-6 py-4">
          <button
            onClick={() =>
              setNotificationModal((prev) => ({
                ...prev,
                isVisible: true,
                data,
              }))
            }
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            <MdNotificationAdd />
          </button>
        </td>
      )}
      {actionCols.includes("Edit") && (
        <td className="text-center text-lg px-6 py-4">
          <button
            onClick={() =>
              hasEditAccess
                ? setEditModal({ isVisible: true, data })
                : toast.error("You don't have access to edit on this page!", {
                    duration: 2000,
                  })
            }
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            <MdModeEdit />
          </button>
        </td>
      )}
      {(actionCols.includes("Delete") || actionCols.includes("Remove")) && (
        <td className="text-center text-base px-6 py-4">
          <button
            onClick={remove}
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            <MdDelete />
          </button>
        </td>
      )}
      {actionCols.includes("Block/Unblock") && (
        <td className="text-center text-base px-6 py-4">
          <button
            onClick={handleBlock}
            className="font-medium text-red-500 hover:text-red-700"
            title={blockUser ? "Unblock user" : "Block user"}
            disabled={toggleBlockBtn}
          >
            {blockUser ? <CgUnblock /> : <MdBlock />}
          </button>
        </td>
      )}
      {actionCols.includes("Publish") && (
        <td className="text-center text-base px-6 py-4">
          <button
            onClick={handlePublish}
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            <BsFillCloudUploadFill />
          </button>
        </td>
      )}
    </>
  );
};

const StatusDropdown = ({
  id,
  value,
  statusChangeUrl,
  setPaginatedData,
  setData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleClick = async (e) => {
    try {
      setIsLoading(true);

      let formdata = new FormData();
      formdata.append("status", e.target.innerText);

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(statusChangeUrl + id, requestOptions);
      const json = await res.json();

      console.log(json);

      if (json.success.status == 200) {
        setToggle(false);
        setData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, _status: e.target.innerText } : item
          )
        );
        setPaginatedData((prev) => ({
          ...prev,
          items: prev.items.map((item) =>
            item.id === id ? { ...item, _status: e.target.innerText } : item
          ),
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={() => setToggle(!toggle)}
      className="relative inline-block text-blue-500 hover:underline cursor-pointer"
    >
      {value}

      {toggle && (
        <DropdownContainer extraStyles="!top-auto !right-auto !left-[130%] bottom-[-100%]">
          {["New", "Pending", "Resolved"].map((elem, indx) => (
            <li
              key={elem + indx}
              onClick={handleClick}
              role="option"
              aria-selected={elem === value}
              className={`${
                indx !== 2 ? "border-b" : ""
              } p-1 text-gray-900 hover:text-gray-600 cursor-pointer whitespace-nowrap`}
            >
              {elem}
            </li>
          ))}
          {isLoading && <Loader />}
        </DropdownContainer>
      )}
    </div>
  );
};

export default Actions;
