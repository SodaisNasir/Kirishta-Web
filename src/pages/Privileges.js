import React, { useEffect, useState } from "react";
import AdvancedTable from "../components/Tables/AdvancedTable";
import { privileges } from "../constants/data";
import { Page } from "../components";
import Paginatation from "../components/Pagintation";
import { BiSearch } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { MdAssignmentInd, MdDelete } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Privileges = () => {
  const initial_filters = {
    searchInput: "",
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
  const [addUser, setAddUser] = useState({
    isVisible: false,
    data: {
      "S/N": null,
      Name: null,
      Email: null,
      "Phone Number": null,
      Password: null,
      _privileges: {
        Dashboard: false,
        Notifications: false,
        Messages: false,
        Alerts: false,
        Privileges: false,
        Roles: false,
        "Sub-Admin": false,
        "Users Management": false,
        Android: false,
        iOS: false,
        "Verification Management": false,
        "Ambulance Management": false,
        "Emergency Management": false,
        "Petition Management": false,
        "Complaint Management": false,
        "iReport Management": false,
        "Travel Safe Management": false,
        "Info Bank Management": false,
        "Top Stories Management": false,
        "Suggestion Management": false,
        "Feedback Management": false,
        "Climate Management": false,
        "Kaci Code Management": false,
        Country: false,
        Location: false,
        Agencies: false,
        "Help Book": false,
        "Complaint Subject": false,
        "Ambulance Service": false,
        Keywords: false,
        "Whatsapp Chat Logs": false,
        Settings: false,
      },
    },
  });
  const { searchInput } = filters;

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
    if (curFilter.filter !== "searchInput") {
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
      setPaginatedData({ items: privileges, curItems: [] });
      setData(privileges);
    }, 2000);
  }, []);

  return (
    <Page title={"Privileges"}>
      <main>
        <Paginatation {...{ itemsPerPage: 2, paginatedData, setPaginatedData }}>
          <AdvancedTable
            {...{
              data,
              paginatedData,
              setPaginatedData,
              Actions,
              actionCols: ["Privileges", "Delete"],
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
                  {paginatedData.items.length} results
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
                </div>
              </div>
            </div>
          </AdvancedTable>
        </Paginatation>
      </main>
    </Page>
  );
};

const AddUserModal = ({ addUser, setAddUser }) => {
  const [page, setPage] = useState(1);
  const [selectedChecks, setSelectedChecks] = useState(
    addUser.data["_privileges"]
  );

  const keys = Object.keys(addUser.data).filter(
    (e) => e !== "S/N" && e[0] !== "_"
  );
  const privilegesKeys = Object.keys(addUser.data["_privileges"]);

  const handleSubmit = () => {
    close();
  };

  const close = () => setAddUser((prev) => ({ ...prev, isVisible: false }));
  const typeCheck = (elem) => {
    let result = null;

    switch (elem) {
      case "Email":
        result = "email";
        break;
      case "Password":
        result = "password";
        break;
      case "Phone Number":
        result = "tel";
        break;

      default:
        result = "text";
        break;
    }

    return result;
  };

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
        <div className="relative w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {page === 1 ? "Add new user" : "Assign Privileges"}
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
              <ol className="flex items-center justify-center w-full mb-4 sm:mb-5 px-32">
                <li
                  title="User Details"
                  className={`flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800`}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full dark:bg-blue-800 shrink-0">
                    {page === 1 ? <AiOutlineForm /> : <BsFillCheckCircleFill />}
                  </div>
                </li>
                <li title="Assign Privileges" className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 ${
                      page === 2
                        ? "text-blue-600 bg-blue-100"
                        : "text-gray-800 bg-gray-100"
                    } rounded-full dark:bg-gray-700 shrink-0`}
                  >
                    <MdAssignmentInd />
                  </div>
                </li>
              </ol>
              <div
                className={
                  page === 1
                    ? "grid grid-cols-1 xs:grid-cols-2 gap-6"
                    : "grid grid-cols-1 xs:grid-cols-2 gap-3 gap-x-5 text-xs"
                }
              >
                {page === 1
                  ? keys.map((elem) => {
                      const type = typeCheck(elem);
                      return (
                        <div key={elem}>
                          <label
                            htmlFor={elem}
                            className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                          >
                            {elem}
                          </label>
                          <input
                            type={type}
                            name={elem}
                            id={elem}
                            pattern={
                              type === "tel"
                                ? "[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                : null
                            }
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required={true}
                          />
                        </div>
                      );
                    })
                  : privilegesKeys.map((elem) => (
                      <div
                        key={elem}
                        className="w-full flex flex-row-reverse items-center justify-between"
                      >
                        <input
                          id={elem.toLowerCase()}
                          onChange={(e) =>
                            setSelectedChecks((prev) => ({
                              ...prev,
                              [elem]: e.target.checked,
                            }))
                          }
                          checked={selectedChecks[elem]}
                          type="checkbox"
                          className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                        />
                        <label
                          htmlFor={elem.toLowerCase()}
                          className="ml-2 font-medium text-gray-800 dark:text-gray-300 hover:text-gray-900 cursor-pointer"
                        >
                          {elem}
                        </label>
                      </div>
                    ))}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-6 py-3  border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => (page === 1 ? setPage(2) : handleSubmit())}
                type={"button"}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-5 py-2 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
              >
                {page === 1 ? "Next" : "Finish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PrivilegesModal = ({ privilegesModal, setPrivilegesModal }) => {
  const [selectedChecks, setSelectedChecks] = useState(
    privilegesModal.privileges
  );
  const keys = Object.keys(privilegesModal.privileges);

  const handleSubmit = (e) => {
    e.preventDefault();

    setPrivilegesModal({
      isVisible: false,
      privileges: selectedChecks,
    });
  };

  const close = () =>
    setPrivilegesModal((prev) => ({ ...prev, isVisible: false }));

  return (
    <>
      <div
        className={`${
          privilegesModal.isVisible ? "" : "hidden"
        } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`${
          privilegesModal.isVisible ? "" : "hidden"
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
                Assign Privileges
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
            <div className="max-h-[70vh] p-6 overflow-y-auto">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 gap-x-5 text-xs">
                {keys.map((elem) => (
                  <div
                    key={elem}
                    className="w-full flex flex-row-reverse items-center justify-between"
                  >
                    <input
                      id={elem.toLowerCase()}
                      onChange={(e) =>
                        setSelectedChecks((prev) => ({
                          ...prev,
                          [elem]: e.target.checked,
                        }))
                      }
                      checked={selectedChecks[elem]}
                      type="checkbox"
                      className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                    />
                    <label
                      htmlFor={elem.toLowerCase()}
                      className="ml-2 font-medium text-gray-800 dark:text-gray-300 hover:text-gray-900 cursor-pointer"
                    >
                      {elem}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-6 py-3 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply
              </button>
            </div>
          </form>
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
}) => {
  const [privilegesModal, setPrivilegesModal] = useState({
    isVisible: false,
    privileges: data["_privileges"],
  });

  const remove = () => {
    setPaginatedData((prev) => ({
      ...prev,
      items: prev.items.filter((user) => user["S/N"] !== SN),
    }));
  };

  return (
    <>
      {/* Edit user modal */}
      {privilegesModal.isVisible && (
        <PrivilegesModal {...{ privilegesModal, setPrivilegesModal }} />
      )}

      <td className="text-center text-base px-6 py-4">
        <button
          onClick={() =>
            setPrivilegesModal((prev) => ({ ...prev, isVisible: true }))
          }
          className="font-medium text-gray-600 dark:text-gray-500 hover:text-gray-800"
        >
          <MdAssignmentInd title="Assign privileges" />
        </button>
      </td>
      <td className="text-center text-base px-6 py-4">
        <button
          onClick={remove}
          className="font-medium text-gray-600 dark:text-gray-500 hover:text-gray-800"
        >
          <MdDelete />
        </button>
      </td>
    </>
  );
};

export default Privileges;
