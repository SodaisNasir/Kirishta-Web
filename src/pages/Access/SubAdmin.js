import React, { useContext, useEffect, useState } from "react";
import AdvancedTable from "../../components/Tables/AdvancedTable";
import { Page, Actions, EditModal, CreateNewModal } from "../../components";
import { BiSearch } from "react-icons/bi";
import { fetchData, fetchRoles } from "../../utils";
import { DropdownFilter } from "../../components/helpers";
import { base_url } from "../../utils/url";
import { AppContext } from "../../context";
import { toast } from "react-hot-toast";

const showAllAdmins = `${base_url}/admin`;
const editUrl = `${base_url}/admin-edit`;
const createUrl = `${base_url}/create-admin`;
const deleteUrl = `${base_url}/admin-delete`;

const SubAdmin = () => {
  const { user } = useContext(AppContext);
  const subadmins = user.privilage["Access"]["Sub-Admin"];
  const hasDeleteAccess = subadmins.Delete;
  const hasEditAccess = subadmins.Edit;
  const hasCreateAccess = subadmins.Create;
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
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [filters, setFilters] = useState(initial_filters);
  const [editModal, setEditModal] = useState({
    isVisible: false,
    data: null,
  });
  const [createNewModal, setCreateNewModal] = useState({
    isVisible: false,
    data: {
      name: "",
      email: "",
      password: "",
      phone_number: "",
      role: "",
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
        items: data.filter(
          (item) =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.email.toLowerCase().includes(value.toLowerCase())
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

  const neededProps = [
    "id",
    "name",
    "email",
    "password",
    "phone_number",
    "role",
  ];

  const getData = async () => {
    const func = (data) => {
      setRoles(data.map((e) => e.role));
      setCreateNewModal((prev) => ({
        ...prev,
        data: { ...prev.data, role: data[0].role },
      }));
    };
    await fetchRoles(null, func);
    await fetchData({
      setPaginatedData,
      setData,
      neededProps,
      url: showAllAdmins,
      setIsDataFetched,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const tableTemplate = Object.fromEntries(neededProps.map((e) => [e, ""]));

  return (
    <Page title={"Sub Admin"}>
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
              hasEditAccess,
              hasDeleteAccess,
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
                placeholder="Search for admins"
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
                    setCurFilter({ filter: value ? "Role" : null, value })
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
                  Add Admin
                </button>

                {/* Add modal */}
                {createNewModal.isVisible && (
                  <CreateNewModal
                    {...{
                      setData,
                      createUrl,
                      createNewModal,
                      setCreateNewModal,
                      setPaginatedData,
                      roles,
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
                      setPaginatedData,
                      editUrl,
                      roles,
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

export default SubAdmin;
