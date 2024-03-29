import React, { useContext, useEffect, useState } from "react";
import AdvancedTable from "../components/Tables/AdvancedTable";
import { EditModal, Page, ViewModal, Actions } from "../components";
import { BiSearch } from "react-icons/bi";
import { CountryFilter } from "../components";
import { DropdownFilter } from "../components/helpers";
import { base_url } from "../utils/url";
import { AppContext } from "../context";
import { fetchData, fetchGeneralCountries } from "../utils";

const showAllUsers = `${base_url}/users`;
const editUrl = `${base_url}/user-edit`;
const deleteUrl = `${base_url}/user-delete`;

const UsersManagement = () => {
  const { user } = useContext(AppContext);
  const users = user.privilage["Users Management"];
  const hasDeleteAccess = users.Delete;
  const hasEditAccess = users.Edit;
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
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [generalCountries, setGeneralCountries] = useState([]);
  const [editModal, setEditModal] = useState({ isVisible: false, data: null });
  const [viewModal, setViewModal] = useState({ isVisible: false, data: null });
  const { searchInput, toggleCountry, toggleStatus } = filters;

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
          (user) =>
            user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.email.toLowerCase().includes(value.toLowerCase())
        ),
      }));
    }
  };

  useEffect(() => {
    if (curFilter.filter && curFilter.filter !== "searchInput") {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter(
          (item) =>
            item[curFilter.filter]?.toLowerCase() ===
            curFilter.value?.toLowerCase()
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
    "_phone_number",
    "_email_verified_at",
    "_profile_image",
    "_country",
    "_device",
    "status",
  ];

  const getData = async () => {
    await fetchGeneralCountries(setGeneralCountries);
    await fetchData({
      setPaginatedData,
      setData,
      neededProps,
      url: showAllUsers,
      setIsDataFetched,
      sort: (data) => data.sort((a, b) => b.id - a.id),
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const tableTemplate = Object.fromEntries(neededProps.map((e) => [e, ""]));

  return (
    <Page title={"Users Management"}>
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
            page: "Users Management",
            Actions,
            actionCols: ["View", "Edit", "Delete", "Block/Unblock"],
            props: {
              setEditModal,
              setViewModal,
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
                placeholder="Search for users"
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
                <CountryFilter
                  {...{
                    toggle: toggleCountry,
                    curFilter,
                    setToggle: () =>
                      setSingleFilter("toggleCountry", !toggleCountry),
                    handleClick: (data) =>
                      setCurFilter({
                        filter: data === null ? null : "_country",
                        value: data === null ? null : data.country_name,
                      }),
                    countries: generalCountries,
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
                      filter: value === null ? null : "status",
                      value,
                    })
                  }
                />

                {/* Edit user modal */}
                {editModal.isVisible && (
                  <EditModal
                    {...{
                      editModal,
                      setEditModal,
                      setData,
                      setPaginatedData,
                      editUrl,
                      statusType: "active/inactive",
                      page: "Users Management",
                      generalCountries,
                    }}
                  />
                )}

                {/* View modal */}
                {viewModal.isVisible && (
                  <ViewModal
                    {...{ viewModal, setViewModal, page: "Users Management" }}
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

export default UsersManagement;
