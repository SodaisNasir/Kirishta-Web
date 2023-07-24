import React, { useContext, useEffect, useState } from "react";
import AdvancedTable from "../../components/Tables/AdvancedTable";
import { privilegesStructure } from "../../constants/data";
import { NestedCheckbox, Page, Actions, Loader } from "../../components";
import { BiSearch } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { DropdownFilter } from "../../components/helpers";
import { transformBack } from "../../components/NestedCheckBox";
import { fetchData } from "../../utils";
import { base_url } from "../../utils/url";
import { AppContext } from "../../context";
import { toast } from "react-hot-toast";

const showAllRoles = `${base_url}/role-privilage`;
const editUrl = `${base_url}/role-privilage-edit/`;
const createUrl = `${base_url}/create-role`;
const deleteUrl = `${base_url}/role-privilage-delete`;

const Roles = () => {
  const { user } = useContext(AppContext);
  const rolesAccess = user.privilage["Access"]["Roles"];
  const hasDeleteAccess = rolesAccess.Delete;
  const hasEditAccess = rolesAccess.Edit;
  const hasCreateAccess = rolesAccess.Create;
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
  const [isDataFetched, setIsDataFetched] = useState(false);
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

  const neededProps = ["id", "role", "_privilage"];

  useEffect(() => {
    setRoles(data.map((e) => e.role));
  }, [data]);

  useEffect(() => {
    fetchData({
      setPaginatedData,
      setData,
      neededProps,
      url: showAllRoles,
      page: "Roles",
      setIsDataFetched,
    });
  }, []);

  const tableTemplate = Object.fromEntries(neededProps.map((e) => [e, ""]));

  return (
    <Page title={"Roles"}>
      <main>
        <AdvancedTable
          {...{
            data,
            setData,
            deleteUrl,
            isDataFetched,
            tableTemplate,
            paginatedData,
            setPaginatedData,
            Actions,
            actionCols: ["Edit", "Remove"],
            props: {
              setEditModal,
              hasDeleteAccess,
              hasEditAccess,
            },
          }}
        >
          <div className="flex flex-col py-4 bg-white lg:flex-row lg:items-center lg:justify-between">
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
                className="block w-full p-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-lg md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for roles"
              />
            </div>
            {/* Search bar end */}
            {/* Dropdown Filters Start */}
            <div className="flex items-center self-end justify-between w-full mt-3 lg:self-auto lg:w-auto lg:mt-0">
              <div className="hidden text-xs font-medium text-gray-700 xs:block lg:hidden">
                {paginatedData.items.length <= 1
                  ? `${paginatedData.items.length} result`
                  : `${paginatedData.items.length} results`}
              </div>

              <div className="flex justify-between w-full xs:w-auto xs:justify-normal">
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
                    hasCreateAccess
                      ? setCreateNewModal((prev) => ({
                          ...prev,
                          isVisible: true,
                        }))
                      : toast.error(
                          "You don't have access to create on this page!",
                          { duration: 2000 }
                        )
                  }
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-200 font-semibold rounded-lg text-xs px-4 py-1.5 ml-2 text-center"
                >
                  Create new
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
  const { user, setUser } = useContext(AppContext);
  let privilage =
    typeof editModal.data._privilage === "string"
      ? JSON.parse(editModal.data._privilage)
      : editModal.data._privilage;
  privilage = typeof privilage === "string" ? JSON.parse(privilage) : privilage;
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

      console.log(
        "response ========> ",
        JSON.parse(json.success.data.privilage)
      );

      if (json.success) {
        const data = {
          role,
          _privilage: privilage,
          id: json.success.data.id,
        };

        if (role === user.role) {
          setUser((prev) => ({ ...prev, privilage }));
          localStorage.setItem("user", JSON.stringify({ ...user, privilage }));
        }

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
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full pointer-events-none`}
      >
        <div className="relative w-full max-w-lg max-h-full pointer-events-auto">
          {/* Modal content */}
          <form
            action="#"
            onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">Edit role</h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center"
              >
                <VscClose />
              </button>
            </div>
            {/* Modal body */}
            <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-3 text-xs">
                <div className="col-span-2">
                  <label
                    htmlFor="role"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Role
                  </label>
                  <input
                    name="role"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
            <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b">
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
          _privilage: json.success.data.privilage,
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
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full pointer-events-none`}
      >
        <div className="relative w-full max-w-lg max-h-full pointer-events-auto">
          {/* Modal content */}
          <form
            action="#"
            onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Add new role
              </h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center"
              >
                <VscClose />
              </button>
            </div>
            {/* Modal body */}
            <div className="p-5 space-y-6 max-h-[72vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-3 text-xs">
                <div className="col-span-2">
                  <label
                    htmlFor="role"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Role
                  </label>
                  <input
                    name="role"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
            <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b">
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

export default Roles;
