import React, { useEffect, useState } from "react";
import AdvancedTable from "../components/Tables/AdvancedTable";
import { parishCountries, users } from "../constants/data";
import { Page } from "../components";
import { BiSearch } from "react-icons/bi";
import { CountryFilter } from "../components";
import { DropdownFilter } from "../components/helpers";
import { MdBlock, MdDelete, MdModeEdit } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { VscClose } from "react-icons/vsc";
import { AiFillEye } from "react-icons/ai";

const UsersManagement = () => {
  const initial_filters = {
    searchInput: "",
    toggleCountry: false,
    toggleStatus: false,
  };
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    curItems: [],
  });
  const [curFilter, setCurFilter] = useState({
    filter: null,
    value: null,
  });
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(initial_filters);
  const [editModal, setEditModal] = useState({ isVisible: false, data: null });
  const [viewModal, setViewModal] = useState({ isVisible: false, data: null });
  const { searchInput, toggleCountry, toggleStatus } = filters;

  const setSingleFilter = (key, value) => {
    setFilters({ ...initial_filters, [key]: value });
  };

  const filterUsersBySearch = (e) => {
    const value = e.target.value.trim();
    setSingleFilter("searchInput", value);
    setCurFilter({ filter: "searchInput", value });

    if (value === "") {
      setPaginatedData((prev) => ({ ...prev, items: data }));
    } else if (value) {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter(
          (user) =>
            user.Name.toLowerCase().includes(value.toLowerCase()) ||
            user.Email.toLowerCase().includes(value.toLowerCase())
        ),
      }));
    }
  };

  useEffect(() => {
    if (curFilter.filter && curFilter.filter !== "searchInput") {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter(
          (user) => user[curFilter.filter] === curFilter.value
        ),
      }));
    } else if (curFilter.filter !== "searchInput") {
      setPaginatedData((prev) => ({
        ...prev,
        items: data,
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curFilter]);

  useEffect(() => {
    // fetch data
    setTimeout(() => {
      setPaginatedData((prev) => ({ ...prev, items: users }));
      setData(users);
    }, 2000);
  }, []);

  return (
    <Page title={"Users Management"}>
      <main>
        <AdvancedTable
          {...{
            data,
            paginatedData,
            setPaginatedData,
            Actions,
            actionCols: ["View", "Edit", "Delete", "Block/Unblock"],
            props: { setEditModal, setViewModal },
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
                placeholder="Search for users"
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
                <CountryFilter
                  {...{
                    toggle: toggleCountry,
                    curFilter,
                    setToggle: () =>
                      setSingleFilter("toggleCountry", !toggleCountry),
                    handleClick: (data) =>
                      setCurFilter({
                        filter: data === null ? null : "_Country",
                        value: data === null ? null : data.title,
                      }),
                  }}
                />

                <DropdownFilter
                  arr={["ACTIVE", "INACTIVE"]}
                  title={"Status"}
                  toggle={toggleStatus}
                  curFilter={curFilter}
                  setToggle={() =>
                    setSingleFilter("toggleStatus", !toggleStatus)
                  }
                  handleClick={(value) =>
                    setCurFilter({
                      filter: value === null ? null : "Status",
                      value,
                    })
                  }
                />

                {/* Edit user modal */}
                {editModal.isVisible && (
                  <EditModal {...{ editModal, setEditModal }} />
                )}

                {/* View modal */}
                {viewModal.isVisible && (
                  <ViewModal {...{ viewModal, setViewModal }} />
                )}
              </div>
            </div>
          </div>
        </AdvancedTable>
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
                data-modal-hide="editUserModal"
              >
                <VscClose />
              </button>
            </div>
            {/* Modal body */}
            <div className="p-5 space-y-6 max-h-[72vh] overflow-y-scroll">
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
                    defaultValue={editModal.data.Name}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Neil Sims"
                    required={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={editModal.data.Email}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@company.com"
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
                    defaultValue={editModal.data._Password}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••••••"
                    required={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="phone-number"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone-number"
                    id="phone-number"
                    defaultValue={editModal.data["Phone Number"]}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g. +(12)3456 789"
                    required={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Country
                  </label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="countries"
                  >
                    {parishCountries.map((elem) => (
                      <option
                        className="text-sm"
                        key={elem.title}
                        value={elem.title}
                      >
                        {elem.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={editModal.data.Status}
                    id="status"
                  >
                    {["ACTIVE", "INACTIVE"].map((elem) => (
                      <option className="text-sm" key={elem} value={elem}>
                        {elem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-5 py-3 text-center"
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

const ViewModal = ({ viewModal, setViewModal }) => {
  const keys = Object.keys(viewModal.data);
  const data = viewModal.data;

  const close = () => setViewModal((prev) => ({ ...prev, isVisible: false }));

  return (
    <>
      <div
        className={`${
          viewModal.isVisible ? "" : "hidden"
        } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`${
          viewModal.isVisible ? "" : "hidden"
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-2xl max-h-full">
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
                    className="col-span-6 sm:col-span-3 flex flex-col justify-center p-2 border rounded-md bg-gray-50"
                  >
                    <p className="block mb-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                      {elem.replace(/_/, (m) => "")}
                    </p>
                    <p className="block text-xs font-medium text-gray-700 dark:text-white">
                      {typeof data[elem] === "string" &&
                      (data[elem].includes("https://") ||
                        data[elem].includes("http://")) ? (
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

const Actions = ({
  tableStructure,
  data,
  SN,
  selectedUsers,
  setSelectedUsers,
  paginatedData,
  setPaginatedData,
  setEditModal,
  setViewModal,
}) => {
  const [blockUser, setBlockUser] = useState(false);

  const remove = () => {
    setPaginatedData((prev) => ({
      ...prev,
      items: prev.items.filter((user) => user["_S/N"] !== SN),
    }));
  };

  return (
    <>
      <td className="text-center text-base px-6 py-4">
        <button
          onClick={() => setViewModal({ isVisible: true, data })}
          className="font-medium text-gray-600 hover:text-gray-800"
        >
          <AiFillEye />
        </button>
      </td>
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
      <td className="text-center text-base px-6 py-4">
        <button
          onClick={() => setBlockUser(!blockUser)}
          className="font-medium text-blue-600 dark:text-blue-500"
          title={blockUser ? "Unblock user" : "Block user"}
        >
          {blockUser ? <CgUnblock /> : <MdBlock />}
        </button>
      </td>
    </>
  );
};

export default UsersManagement;
