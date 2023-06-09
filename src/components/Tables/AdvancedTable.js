import React, { useEffect, useState } from "react";
import Loader from "../Loaders/Loader";
import { DropdownContainer } from "../helpers";
import { Link } from "react-router-dom";

const AdvancedTable = ({
  data,
  paginatedData,
  setPaginatedData,
  Actions,
  actionCols,
  props,
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [tableStructure, setTableStructure] = useState(null);

  const handleCheckChange = (e) => {
    e.target.checked
      ? setSelectedUsers(
          paginatedData.items.length
            ? paginatedData.items.map((user) => user["S/N"])
            : paginatedData.curItems.map((user) => user["S/N"])
        )
      : setSelectedUsers([]);
  };

  useEffect(() => {
    if (data.length) {
      setTableStructure(Object.keys(data[0]));
      setIsLoading(false);
    }
  }, [data]);

  return (
    <>
      {children}
      <div className="xs:hidden lg:block mb-1 text-xs font-medium text-gray-700">
        {paginatedData.items.length <= 1
          ? `${paginatedData.items.length} result`
          : `${paginatedData.items.length} results`}
      </div>
      <div
        className={`${
          isLoading ? "relative min-h-[50vh]" : ""
        } relative overflow-x-auto rounded-lg mx-auto w-full`}
        // } relative overflow-x-auto rounded-lg mx-auto md:max-w-lg lg:max-w-[725px] xl:max-w-5xl`}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      onChange={handleCheckChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                {/* Other Columns */}
                {tableStructure.map(
                  (key) =>
                    key !== "Images" &&
                    key[0] !== "_" && (
                      <th
                        key={key}
                        scope="col"
                        className="text-center px-6 py-3"
                      >
                        {key}
                      </th>
                    )
                )}

                {/* Action Columns */}
                {actionCols.map((elem) => (
                  <th key={elem} scope="col" className="text-center px-6 py-3">
                    {elem}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs">
              {paginatedData.curItems.length ? (
                <Users
                  {...{
                    tableStructure,
                    selectedUsers,
                    setSelectedUsers,
                    paginatedData,
                    setPaginatedData,
                    Actions,
                    props,
                  }}
                />
              ) : (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td
                    colSpan={tableStructure.length + 2}
                    className="text-center w-4 p-4"
                  >
                    No data found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

const Users = ({
  tableStructure,
  selectedUsers,
  setSelectedUsers,
  paginatedData,
  setPaginatedData,
  Actions,
  props,
}) => {
  return paginatedData.curItems.length
    ? paginatedData.curItems.map((user, indx) => (
        <SingleUser
          key={indx}
          {...{
            tableStructure,
            data: user,
            SN:
              typeof user["S/N"] === "number"
                ? user["S/N"]
                : typeof user["_S/N"] === "number"
                ? user["_S/N"]
                : null,
            selectedUsers,
            setSelectedUsers,
            paginatedData,
            setPaginatedData,
            Actions,
            props,
          }}
        />
      ))
    : paginatedData.items.map((user, indx) => (
        <SingleUser
          key={indx}
          {...{
            tableStructure,
            data: user,
            SN:
              typeof user["S/N"] === "number"
                ? user["S/N"]
                : typeof user["_S/N"] === "number"
                ? user["_S/N"]
                : null,
            selectedUsers,
            setSelectedUsers,
            paginatedData,
            setPaginatedData,
            props,
          }}
        />
      ));
};

const SingleUser = ({
  tableStructure,
  data,
  SN,
  selectedUsers,
  setSelectedUsers,
  paginatedData,
  setPaginatedData,
  Actions,
  props,
}) => {
  const handleCheckChange = (e) => {
    selectedUsers.includes(SN)
      ? setSelectedUsers((prev) => prev.filter((e) => e !== SN))
      : setSelectedUsers((prev) => [...prev, SN]);
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={"checkbox-table-search-" + SN}
            type="checkbox"
            checked={selectedUsers.includes(SN)}
            onChange={handleCheckChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
          />
          <label htmlFor={"checkbox-table-search-" + SN} className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      {tableStructure.map(
        (key) =>
          key[0] !== "_" && (
            <td
              key={key + SN}
              className="px-6 py-4 text-center whitespace-nowrap md:whitespace-normal"
            >
              {key === "Image" ||
              key === "Media File" ||
              key === "country flag" ? (
                <img
                  className="w-10 mx-auto"
                  src={data[key]}
                  alt={data.Title}
                />
              ) : key === "Status" &&
                (data[key] === "PENDING" || data[key] === "RESOLVED") ? (
                <StatusDropdown {...{ value: data[key] }} />
              ) : key.toLowerCase() === "app page" ? (
                <Link
                  to={data[key]}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                >
                  {data[key]}
                </Link>
              ) : Array.isArray(data[key]) ? (
                data[key].join(", ")
              ) : (
                data[key]
              )}
            </td>
          )
      )}
      {Actions && (
        <Actions
          {...{
            ...props,
            tableStructure,
            data,
            SN,
            selectedUsers,
            setSelectedUsers,
            paginatedData,
            setPaginatedData,
          }}
        />
      )}
    </tr>
  );
};

const StatusDropdown = ({ value }) => {
  const [state, setState] = useState({ toggle: false, value: value });
  const handleClick = (e) =>
    setState({ toggle: false, value: e.target.innerText });

  return (
    <div
      onClick={() => setState((prev) => ({ ...prev, toggle: !state.toggle }))}
      className="relative inline-block text-blue-500 hover:underline cursor-pointer"
    >
      {state.value}

      {state.toggle && (
        <DropdownContainer extraStyles="!top-auto !right-auto !left-[130%] bottom-[-100%]">
          {["NEW", "PENDING", "RESOLVED"].map((elem, indx) => (
            <li
              key={elem + indx}
              onClick={handleClick}
              role="option"
              aria-selected={elem === state.value}
              className={`${
                indx !== 2 ? "border-b" : ""
              } p-1 text-gray-900 hover:text-gray-600 cursor-pointer whitespace-nowrap`}
            >
              {elem}
            </li>
          ))}
        </DropdownContainer>
      )}
    </div>
  );
};

export default AdvancedTable;
