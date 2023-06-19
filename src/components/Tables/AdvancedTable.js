import React, { useEffect, useState } from "react";
import Loader from "../Loaders/Loader";
import { DropdownContainer } from "../helpers";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

const AdvancedTable = ({
  data,
  paginatedData,
  setPaginatedData,
  setData,
  Actions,
  deleteUrl,
  tableTemplate,
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
            ? paginatedData.items.map((item) => item.id)
            : paginatedData.curItems.map((item) => item.id)
        )
      : setSelectedUsers([]);
  };

  useEffect(() => {
    if (data.length) {
      setTableStructure(
        typeof tableTemplate === "object"
          ? Object.keys(tableTemplate)
          : Object.keys(data[0])
      );
      setIsLoading(false);
    }
  }, [data]);

  return (
    <>
      {children}
      <div className="xs:hidden lg:block mb-1 ml-1.5 text-xs font-medium text-gray-700">
        {paginatedData.items.length <= 1
          ? `${paginatedData.items.length} result`
          : `${paginatedData.items.length} results`}
      </div>

      <Pagination {...{ paginatedData, setPaginatedData }} />

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
                        {key === "id" ? "S/N" : key.replace("_", " ")}
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
                    actionCols,
                    deleteUrl,
                    setData,
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
  actionCols,
  deleteUrl,
  setData,
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
            id:
              typeof user.id === "number"
                ? user.id
                : typeof user._id === "number"
                ? user._id
                : null,
            selectedUsers,
            setSelectedUsers,
            paginatedData,
            setPaginatedData,
            actionCols,
            deleteUrl,
            setData,
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
            id:
              typeof user.id === "number"
                ? user.id
                : typeof user._id === "number"
                ? user._id
                : null,
            selectedUsers,
            setSelectedUsers,
            paginatedData,
            setPaginatedData,
            actionCols,
            setData,
            deleteUrl,
            Actions,
            props,
          }}
        />
      ));
};

// const privilageObjToText = (obj) => {
//   const roles = obj.Access.Roles;
//   const subadmin = obj.Access.Roles;
//   const users = obj['Users Management'];
//   const banner = obj['Promotion Management'].Banner;
//   const popup = obj['Promotion Management']['Pop-up'];

//   return `${obj.Dashboard ? "Dashboard, " : ""}${roles.Create || roles.Edit || roles.Delete ? `Roles (${
//     roles.Create ? "create, " : ""
//   }${roles.Edit ? "edit, " : ""}${
//     roles.Delete ? "delete, " : ""
//   }), ` : ''}${subadmin.Create || subadmin.Edit || subadmin.Delete ? `Roles (${
//     subadmin.Create ? "create, " : ""
//   }${subadmin.Edit ? "edit, " : ""}${
//     subadmin.Delete ? "delete, " : ""
//   }), ` : ''}${users.Create || users.Edit || users.Delete ? `Roles (${
//     users.Create ? "create, " : ""
//   }${users.Edit ? "edit, " : ""}${
//     users.Delete ? "delete, " : ""
//   }), ` : ''}`;
// };

const SingleUser = ({
  tableStructure,
  data,
  setData,
  id,
  selectedUsers,
  setSelectedUsers,
  paginatedData,
  setPaginatedData,
  deleteUrl,
  actionCols,
  Actions,
  props,
}) => {
  const handleCheckChange = (e) => {
    selectedUsers.includes(id)
      ? setSelectedUsers((prev) => prev.filter((e) => e !== id))
      : setSelectedUsers((prev) => [...prev, id]);
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={"checkbox-table-search-" + id}
            type="checkbox"
            checked={selectedUsers.includes(id)}
            onChange={handleCheckChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
          />
          <label htmlFor={"checkbox-table-search-" + id} className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      {tableStructure.map(
        (key) =>
          key[0] !== "_" && (
            <td
              key={key + id}
              className={`px-6 py-4 text-center ${
                key === "flag_code" ? "font-emoji text-2xl" : ""
              } whitespace-nowrap md:whitespace-normal`}
            >
              {key.includes("image") || key === "Media File" ? (
                <img
                  className="w-10 mx-auto"
                  src={data[key]}
                  alt={data.Title}
                />
              ) : key === "status" &&
                (data[key] === "PENDING" || data[key] === "RESOLVED") ? (
                <StatusDropdown {...{ value: data[key] }} />
              ) : key === "privilage" ? (
                "true"
              ) : key === "app_page" ? (
                <a
                  href={
                    data[key].includes("http")
                      ? data[key]
                      : "https://" + data[key]
                  }
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {data[key]}
                </a>
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
            actionCols,
            tableStructure,
            deleteUrl,
            data,
            setData,
            id,
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
