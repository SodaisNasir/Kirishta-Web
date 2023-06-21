import React, { useEffect, useState } from "react";
import AdvancedTable from "../../components/Tables/AdvancedTable";
import { languages } from "../../constants/data";
import { CreateNewModal, EditModal, Page, Actions } from "../../components";
import { BiSearch } from "react-icons/bi";
import { GoChevronDown } from "react-icons/go";
import { DropdownContainer } from "../../components/helpers";
import { base_url } from "../../utils/url";
import { fetchData } from "../../utils";

const showAllfaqs = `${base_url}/faq`;
const editUrl = `${base_url}/edit-faq`;
const createUrl = `${base_url}/create-faq`;
const deleteUrl = `${base_url}/delete-faq`;

const FAQManagement = () => {
  const initial_filters = {
    searchInput: "",
    toggleLanguage: false,
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
  const [createNewModal, setCreateNewModal] = useState({
    isVisible: false,
    data: {
      question: null,
      answer: null,
      language: "English",
    },
  });
  const { searchInput, toggleLanguage } = filters;

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
            user.question.toLowerCase().includes(value.toLowerCase()) ||
            user.answer.toLowerCase().includes(value.toLowerCase())
        ),
      }));
    }
  };

  useEffect(() => {
    if (curFilter.filter && curFilter.filter !== "searchInput") {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter(
          (item) => item[curFilter.filter] === curFilter.value
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

  const neededProps = ["id", "question", "answer", "language"];

  useEffect(() => {
    fetchData(setPaginatedData, setData, neededProps, showAllfaqs);
  }, []);

  return (
    <Page title={"FAQ Management"}>
      <main>
        <AdvancedTable
          {...{
            data,
            setData,
            deleteUrl,
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
                placeholder="Search for FAQs"
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
                <LanguageFilter
                  {...{
                    toggle: toggleLanguage,
                    setToggle: () =>
                      setSingleFilter("toggleLanguage", !toggleLanguage),
                    curFilter,
                    handleClick: (value) =>
                      setCurFilter({
                        filter: value === null ? value : "language",
                        value,
                      }),
                  }}
                />

                <button
                  onClick={() =>
                    setCreateNewModal((prev) => ({
                      ...prev,
                      isVisible: true,
                    }))
                  }
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-200 font-semibold rounded-lg text-xs px-4 py-1.5 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800/50"
                >
                  Create new
                </button>

                {/* Create new modal */}
                {createNewModal.isVisible && (
                  <CreateNewModal
                    {...{
                      createNewModal,
                      setCreateNewModal,
                      createUrl,
                      setData,
                      setPaginatedData,
                      gridCols: 1,
                    }}
                  />
                )}

                {/* Edit user modal */}
                {editModal.isVisible && (
                  <EditModal
                    {...{
                      editModal,
                      setEditModal,
                      editUrl,
                      setData,
                      setPaginatedData,
                      gridCols: 1,
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

const LanguageFilter = ({ toggle, setToggle, curFilter, handleClick }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleSelect = (elem) => {
    handleClick(elem);
    setSelectedLanguage(elem);
  };

  useEffect(() => {
    if (curFilter.filter !== "language") {
      setSelectedLanguage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curFilter]);

  return (
    <button
      onClick={setToggle}
      className={`relative flex items-center text-xs bg-gray-50 hover:bg-gray-100 dark:bg-gray-500 dark:hover:bg-gray-600 p-2 py-1.5 rounded-[6px] cursor-pointer`}
    >
      <span className="pl-1.5 pr-1 text-xs text-left whitespace-nowrap">
        {!selectedLanguage ? "All languages" : selectedLanguage}
      </span>
      <span className={toggle ? "rotate-180" : ""}>
        <GoChevronDown />
      </span>

      {/* Dropdown */}
      {toggle && (
        <DropdownContainer extraStyles="text-left translate-x-[50%] xs:translate-x-0">
          <li
            onClick={() => handleSelect(null)}
            className={`flex items-center text-xs whitespace-nowrap p-1 pt-1.5 pb-1 border-b border-[#f2f2f2] cursor-pointer hover:text-gray-500`}
            role="option"
          >
            <span>All languages</span>
          </li>
          {languages.map((elem, idx) => (
            <li
              key={elem + idx}
              onClick={() => handleSelect(elem)}
              className={`flex items-center p-1 cursor-pointer hover:text-gray-500 ${
                idx !== languages.length - 1 ? "border-b border-[#f2f2f2]" : ""
              }`}
              role="option"
            >
              <span className="text-xs whitespace-nowrap">{elem}</span>
            </li>
          ))}
        </DropdownContainer>
      )}
    </button>
  );
};

export default FAQManagement;
