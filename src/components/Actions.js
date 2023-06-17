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
  setMediaModal,
  setViewModal,
  setIsViewerOpen,
  setDependantsModal,
  setCallCentersModal,
}) => {
  const navigate = useNavigate();
  const [blockUser, setBlockUser] = useState(false);

  const remove = async () => {
    try {
      const requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
      };
      const res = await fetch(`${deleteUrl}/${id}`, requestOptions);
      const json = await res.json();

      if (json.success.status == 200) {
        setData((prev) => prev.filter((e) => e.id !== id));
        setPaginatedData((prev) => ({
          ...prev,
          items: prev.items.filter((e) => e.id !== id),
        }));
      }
    } catch (err) {
      console.error(err);
    }

    setPaginatedData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const redirect = () => navigate("/users-management/user-details/" + data._id);

  return (
    <>
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
              setReplyModal((prev) => ({ ...prev, isVisible: true }))
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
              setReplyModal((prev) => ({ ...prev, isVisible: true }))
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
            onClick={() => setBlockUser(!blockUser)}
            className="font-medium text-red-600 dark:text-red-500"
            title={blockUser ? "Unblock user" : "Block user"}
          >
            {blockUser ? <CgUnblock /> : <MdBlock />}
          </button>
        </td>
      )}
    </>
  );
};

export default Actions;
