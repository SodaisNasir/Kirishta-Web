import React, { useEffect, useState } from "react";
import AdvancedTable from "../components/Tables/AdvancedTable";
import { admins } from "../constants/data";
import { Page } from "../components";
import Paginatation from "../components/Pagintation";
import { BiSearch } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { typeCheck } from "../utils";

const AdminEmail = () => {
  const initial_filters = {
    searchInput: "",
  };
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    curItems: [],
  });
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(initial_filters);
  const [editModal, setEditModal] = useState({ isVisible: false, data: null });
  const [addUser, setAddUser] = useState({
    isVisible: false,
    data: {
      "S/N": null,
      Name: null,
      "Admin Email 1": null,
      "Admin Email 2": null,
      "Admin Email 3": null,
      Password: null,
      "Phone Number": null,
    },
  });
  const { searchInput } = filters;

  const setSingleFilter = (key, value) => {
    setFilters({ ...initial_filters, [key]: value });
  };

  const filterUsersBySearch = (e) => {
    const value = e.target.value.trim();
    setSingleFilter("searchInput", value);

    if (value === "") {
      setPaginatedData((prev) => ({ ...prev, ...prev, items: data }));
    } else if (value) {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter(
          (item) =>
            item.Name.toLowerCase().includes(value.toLowerCase()) ||
            item["Admin Email 1"].toLowerCase().includes(value.toLowerCase()) ||
            item["Admin Email 2"].toLowerCase().includes(value.toLowerCase()) ||
            item["Admin Email 3"].toLowerCase().includes(value.toLowerCase())
        ),
      }));
    }
  };

  useEffect(() => {
    // fetch data
    setTimeout(() => {
      setPaginatedData((prev) => ({ ...prev, ...prev, items: admins }));
      setData(admins);
    }, 2000);
  }, []);

  return (
    <Page title={"Admin Email"}>
      <main>
        <Paginatation {...{ itemsPerPage: 2, paginatedData, setPaginatedData }}>
          <AdvancedTable
            {...{
              data,
              paginatedData,
              setPaginatedData,
              Actions,
              actionCols: ["Edit", "Delete"],
              props: { setEditModal },
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 bg-white dark:bg-gray-800">
              {/* Search bar start */}
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <BiSearch />
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  value={searchInput}
                  onChange={filterUsersBySearch}
                  className="block w-full md:w-80 p-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for admins"
                />
              </div>
              {/* Search bar end */}
              {/* Dropdown Filters Start */}
              <div className="flex justify-between items-center w-full self-end lg:self-auto lg:w-auto mt-3 lg:mt-0">
                <div className="hidden xs:block lg:hidden text-xs font-medium text-gray-700">
                  {paginatedData.items.length <= 1
                    ? `${paginatedData.items.length} result`
                    : `${paginatedData.items.length} results`}
                </div>

                <div className="w-full flex justify-between xs:w-auto xs:justify-normal">
                  <button
                    onClick={() =>
                      setAddUser((prev) => ({
                        ...prev,
                        isVisible: true,
                      }))
                    }
                    className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-200 font-semibold rounded-lg text-xs px-4 py-1.5 ml-2 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
                  >
                    Add User
                  </button>
                  {/* Add User modal */}
                  {addUser.isVisible && (
                    <AddUserModal {...{ addUser, setAddUser }} />
                  )}

                  {/* Edit user modal */}
                  {editModal.isVisible && (
                    <EditModal {...{ editModal, setEditModal }} />
                  )}
                </div>
              </div>
            </div>
          </AdvancedTable>
        </Paginatation>
      </main>
    </Page>
  );
};

const EditModal = ({ editModal, setEditModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    setEditModal({
      isVisible: false,
      data: {},
    });
  };

  const close = () => setEditModal((prev) => ({ ...prev, isVisible: false }));

  return (
    <>
      <div
        className={`${
          editModal.isVisible ? "" : "hidden"
        } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`${
          editModal.isVisible ? "" : "hidden"
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <form
            action="#"
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
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-scroll">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={editModal.data.Name}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                    required={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="admin-email-1"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Admin Email 1
                  </label>
                  <input
                    type="email"
                    name="admin-email-1"
                    id="admin-email-1"
                    value={editModal.data["Admin Email 1"]}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                    required={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="admin-email-2"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Admin Email 2
                  </label>
                  <input
                    type="email"
                    name="admin-email-2"
                    id="admin-email-2"
                    value={editModal.data["Admin Email 2"]}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                    required={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="admin-email-3"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Admin Email 3
                  </label>
                  <input
                    type="email"
                    name="admin-email-3"
                    id="admin-email-3"
                    value={editModal.data["Admin Email 3"]}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                    required={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={editModal.data.Password}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••••••••"
                    required={true}
                  />
                </div>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const AddUserModal = ({ addUser, setAddUser }) => {
  const keys = Object.keys(addUser.data).filter(
    (e) => e !== "S/N" && e[0] !== "_"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    close();
  };

  const close = () => setAddUser((prev) => ({ ...prev, isVisible: false }));

  return (
    <>
      <div
        className={`${
          addUser.isVisible ? "" : "hidden"
        } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`${
          addUser.isVisible ? "" : "hidden"
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-2xl max-h-full"
        >
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add new admin
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
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
                {keys.map((elem) => {
                  const type = typeCheck(elem);

                  return (
                    <div key={elem} className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor={elem.toLowerCase()}
                        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                      >
                        {elem}
                      </label>
                      <input
                        type={type}
                        name={elem.toLowerCase()}
                        id={elem.toLowerCase()}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required={true}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-6 py-3  border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-5 py-2 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

const Actions = ({
  tableStructure,
  data,
  SN,
  selectedUsers,
  setSelectedUsers,
  paginatedData,
  setPaginatedData,
  setEditModal,
}) => {
  const remove = () => {
    setPaginatedData((prev) => ({
      ...prev,
      items: prev.items.filter((user) => user["S/N"] !== SN),
    }));
  };

  return (
    <>
      <td className="text-center text-base px-6 py-4">
        <button
          onClick={() => setEditModal({ isVisible: true, data })}
          className="font-medium text-gray-600 hover:text-gray-800"
        >
          <MdModeEdit />
        </button>
      </td>
      <td className="text-center text-base px-6 py-4">
        <button
          onClick={remove}
          className="font-medium text-gray-600 hover:text-gray-800"
        >
          <MdDelete />
        </button>
      </td>
    </>
  );
};

export default AdminEmail;
