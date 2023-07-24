import React, { useContext, useEffect, useState } from "react";
import AdvancedTable from "../components/Tables/AdvancedTable";
import { Page, Actions, ViewModal, ReplyModal } from "../components";
import { BiSearch } from "react-icons/bi";
import { DropdownFilter } from "../components/helpers";
import { fetchData } from "../utils";
import { base_url } from "../utils/url";
import { AppContext } from "../context";

const showAllFeedbacks = `${base_url}/feedback`;
const statusChangeUrl = `${base_url}/feedback-status/`;
const deleteUrl = `${base_url}/feedback-delete`;
const replyUrl = `${base_url}/reply-feedback/`;

const FeedbackManagement = () => {
  const { user } = useContext(AppContext);
  const feedback = user.privilage["Feedback Management"];
  const hasDeleteAccess = feedback.Delete;
  const hasEditAccess = feedback.Edit;
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
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [replyModal, setReplyModal] = useState({
    id: null,
    isVisible: false,
    message: "",
  });
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
            user.text.toLowerCase().includes(value.toLowerCase())
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
    "text",
    "image",
    "user_id",
    "_created_at",
    "_status",
  ];

  useEffect(() => {
    fetchData({
      setPaginatedData,
      setData,
      neededProps,
      url: showAllFeedbacks,
      setIsDataFetched,
      sort: (data) => data.sort((a, b) => b.id - a.id),
    });
  }, []);

  const tableTemplate = Object.fromEntries(neededProps.map((e) => [e, ""]));

  return (
    <Page title={"Feedbacks Management"}>
      <main>
        <AdvancedTable
          {...{
            page: "Feedbacks Management",
            data,
            setData,
            deleteUrl,
            tableTemplate,
            isDataFetched,
            statusChangeUrl,
            paginatedData,
            setPaginatedData,
            Actions,
            actionCols: ["status", "View", "Reply", "Delete"],
            props: {
              setViewModal,
              setReplyModal,
              statusChangeUrl,
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
                placeholder="Search for feedbacks"
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
                  arr={["New", "Resolved", "Pending"]}
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

                {/* Reply modal */}
                {replyModal.isVisible && (
                  <ReplyModal {...{ replyModal, setReplyModal, replyUrl }} />
                )}
              </div>
            </div>
          </div>
        </AdvancedTable>
      </main>
    </Page>
  );
};

export default FeedbackManagement;
