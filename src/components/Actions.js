import { useState } from "react";
import {
  AiFillEye,
  AiFillFileImage,
  AiFillFolderOpen,
  AiOutlineFolderView,
} from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { CgUnblock } from "react-icons/cg";
import { FaReplyAll } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
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

const Actions = ({
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
  setDependantsModal,
  setCallCentersModal,
  statusChangeUrl,
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

  const remove = async () => {
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
      {actionCols.includes("Dependants") && (
        <td className="text-center text-base px-6 py-4">
          <button
            onClick={() =>
              setDependantsModal({
                isVisible: true,
                dependants: data._dependants,
              })
            }
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            <HiUserGroup />
          </button>
        </td>
      )}
      {actionCols.includes("Special Call Centers") && (
        <td className="text-center text-lg px-6 py-4">
          <button
            onClick={() =>
              setCallCentersModal({
                isVisible: true,
                data,
              })
            }
            className="hover:text-gray-800 font-medium text-gray-600 dark:text-gray-500"
          >
            <AiOutlineFolderView />
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
            onClick={() => setEditModal({ isVisible: true, data })}
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
            className="hover:text-gray-800 font-medium text-gray-600 dark:text-gray-500"
          >
            <MdDelete />
          </button>
        </td>
      )}
      {actionCols.includes("Block/Unblock") && (
        <td className="text-center text-base px-6 py-4">
          <button
            onClick={handleBlock}
            className="font-medium text-blue-600 dark:text-blue-500"
            title={blockUser ? "Unblock user" : "Block user"}
            disabled={toggleBlockBtn}
          >
            {blockUser ? <CgUnblock /> : <MdBlock />}
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
