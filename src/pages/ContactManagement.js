import React, { useEffect, useState } from "react";
import AdvancedTable from "../components/Tables/AdvancedTable";
import { Page, ReplyModal, ViewModal, Actions } from "../components";
import { BiSearch } from "react-icons/bi";
import { DropdownFilter } from "../components/helpers";
import { base_url } from "../utils/url";
import { fetchData } from "../utils";

const showAllContacts = `${base_url}/contact`;
const statusChangeUrl = `${base_url}/contact-status/`;
const deleteUrl = `${base_url}/contact-delete`;

const ContactManagement = () => {
  const initial_filters = {
    searchInput: "",
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
  const [replyModal, setReplyModal] = useState(false);
  const [viewModal, setViewModal] = useState({ isVisible: false, data: null });
  const { searchInput, toggleStatus } = filters;

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
            user.subject.toLowerCase().includes(value.toLowerCase()) ||
            user._message.toLowerCase().includes(value.toLowerCase())
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
    "_phone_number",
    "subject",
    "_message",
    "_status",
  ];

  useEffect(() => {
    fetchData(setPaginatedData, setData, neededProps, showAllContacts);
  }, []);

  return (
    <Page title={"Contact Management"}>
      <main>
        <AdvancedTable
          {...{
            page: "Contact Management",
            data,
            setData,
            deleteUrl,
            paginatedData,
            setPaginatedData,
            Actions,
            actionCols: ["status", "View", "Reply", "Delete"],
            props: { setViewModal, setReplyModal, statusChangeUrl },
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
                placeholder="Search for contacts"
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
                  arr={["RESOLVED", "PENDING"]}
                  title={"Status"}
                  toggle={toggleStatus}
                  curFilter={curFilter}
                  setToggle={() =>
                    setSingleFilter("toggleStatus", !toggleStatus)
                  }
                  handleClick={(value) =>
                    setCurFilter({ filter: value ? "_status" : null, value })
                  }
                />

                {/* View modal */}
                {viewModal.isVisible && (
                  <ViewModal {...{ viewModal, setViewModal }} />
                )}

                {/* Edit user modal */}
                {replyModal.isVisible && <ReplyModal {...{ setReplyModal }} />}
              </div>
            </div>
          </div>
        </AdvancedTable>
      </main>
    </Page>
  );
};

export default ContactManagement;
