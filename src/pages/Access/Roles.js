import React, { useEffect, useState } from "react";
import AdvancedTable from "../../components/Tables/AdvancedTable";
import { privilegesStructure } from "../../constants/data";
import { NestedCheckbox, Page, Actions, Loader } from "../../components";
import { BiSearch } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { DropdownFilter } from "../../components/helpers";
import { transformBack } from "../../components/NestedCheckBox";
import { fetchData, fetchRoles } from "../../utils";
import { base_url } from "../../utils/url";

const showAllRoles = `${base_url}/role-privilage`;
const editUrl = `${base_url}/role-privilage-edit/`;
const createUrl = `${base_url}/create-role`;
const deleteUrl = `${base_url}/role-privilage-delete`;

const Roles = () => {
  const initial_filters = {
    searchInput: "",
    toggleRole: false,
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
  const [editModal, setEditModal] = useState({ isVisible: false, data });
  const [createNewModal, setCreateNewModal] = useState({
    isVisible: false,
    data: {
      role: "",
      privilage: "",
    },
  });
  const [roles, setRoles] = useState(null);
  const { searchInput, toggleRole } = filters;

  const setSingleFilter = (key, value) => {
    setFilters({ ...initial_filters, [key]: value });
  };

  const filterUsersBySearch = (e) => {
    const value = e.target.value;
    setSingleFilter("searchInput", value);
    setCurFilter({ filter: "searchInput", value });

    if (value === "") {
      setPaginatedData((prev) => ({ ...prev, items: data }));
    } else if (value) {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter((item) =>
          item.role.toLowerCase().includes(value.toLowerCase())
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

  const neededProps = ["id", "role", "privilage"];

  useEffect(() => {
    fetchRoles(setRoles);
    fetchData(setPaginatedData, setData, neededProps, showAllRoles, "Roles");
  }, []);

  return (
    <Page title={"Roles"}>
      <main>
        <AdvancedTable
          {...{
            data,
            setData,
            deleteUrl,
            paginatedData,
            setPaginatedData,
            Actions,
            actionCols: ["Edit", "Remove"],
            props: { setEditModal },
          }}>
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
                placeholder="Search for roles"
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
                <DropdownFilter
                  arr={roles}
                  title={"Role"}
                  toggle={toggleRole}
                  curFilter={curFilter}
                  setToggle={() => setSingleFilter("toggleRole", !toggleRole)}
                  handleClick={(value) =>
                    setCurFilter({ filter: value ? "role" : null, value })
                  }
                />

                <button
                  onClick={() =>
                    setCreateNewModal((prev) => ({
                      ...prev,
                      isVisible: true,
                    }))
                  }
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-200 font-semibold rounded-lg text-xs px-4 py-1.5 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800/50">
                  Add Role
                </button>

                {/* Create new modal */}
                {createNewModal.isVisible && (
                  <CreateNewModal
                    {...{
                      createNewModal,
                      setCreateNewModal,
                      setData,
                      setPaginatedData,
                      setRoles,
                      createUrl,
                    }}
                  />
                )}

                {/* Edit user modal */}
                {editModal.isVisible && (
                  <EditModal
                    {...{
                      editModal,
                      setEditModal,
                      setData,
                      setRoles,
                      setPaginatedData,
                      editUrl,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </AdvancedTable>
      </main>
    </Page>
  );
};

const EditModal = ({
  editModal,
  setEditModal,
  setData,
  setPaginatedData,
  editUrl,
}) => {
  const privilage =
    typeof editModal.data.privilage === "string"
      ? JSON.parse(editModal.data.privilage)
      : editModal.data.privilage;
  const [role, setRole] = useState(editModal.data.role);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [selectedChecks, setSelectedChecks] = useState(privilage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleBtn(true);

    const privilage = Array.isArray(selectedChecks)
      ? transformBack(selectedChecks)
      : selectedChecks;

    console.log("privilages ==========> ", privilage);

    try {
      let formdata = new FormData();
      formdata.append("role", role);
      formdata.append("privilage", JSON.stringify(privilage));

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(editUrl + editModal.data.id, requestOptions);
      const json = await res.json();

      console.log(JSON.parse(JSON.parse(json.success.data.privilage)));

      if (json.success) {
        const data = {
          role,
          privilage,
          id: json.success.data.id,
        };

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
      setEditModal((prev) => ({
        ...prev,
        isVisible: false,
      }));
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
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full pointer-events-none`}>
        <div className="relative w-full max-w-lg max-h-full pointer-events-auto">
          {/* Modal content */}
          <form
            action="#"
            onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit role
              </h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <VscClose />
              </button>
            </div>
            {/* Modal body */}
            <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-3 text-xs">
                <div className="col-span-2">
                  <label
                    htmlFor="role"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                    Role
                  </label>
                  <input
                    name="role"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <NestedCheckbox
                  selectedChecks={privilage}
                  setSelectedChecks={setSelectedChecks}
                  type="edit"
                />
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="flex items-center justify-center w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
                disabled={toggleBtn}>
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

const CreateNewModal = ({
  createNewModal,
  setCreateNewModal,
  setData,
  setPaginatedData,
  setRoles,
  createUrl,
}) => {
  const initial_state = createNewModal.data;
  const [role, setRole] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);
  const [selectedChecks, setSelectedChecks] = useState(null);

  // console.log("selectedChecks", transformBack(selectedChecks));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleBtn(true);

    const privilage = transformBack(selectedChecks);

    try {
      let formdata = new FormData();
      formdata.append("role", role);
      formdata.append("privilage", JSON.stringify(privilage));

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

      if (json.success) {
        const data = {
          role,
          privilage: JSON.stringify(privilage),
          id: json.success.data.id,
        };
        setRoles((prev) => [...prev, role]);
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
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full pointer-events-none`}>
        <div className="relative w-full max-w-lg max-h-full pointer-events-auto">
          {/* Modal content */}
          <form
            action="#"
            onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add new role
              </h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <VscClose />
              </button>
            </div>
            {/* Modal body */}
            <div className="p-5 space-y-6 max-h-[72vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-3 text-xs">
                <div className="col-span-2">
                  <label
                    htmlFor="role"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                    Role
                  </label>
                  <input
                    name="role"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                  />
                </div>
                <NestedCheckbox
                  data={privilegesStructure}
                  setSelectedChecks={setSelectedChecks}
                />
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="flex items-center justify-center w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
                disabled={toggleBtn}>
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

export default Roles;
