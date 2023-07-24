import React, { useEffect, useState } from "react";
import Loader from "../Loaders/Loader";
import Pagination from "../Pagination";

const AdvancedTable = ({
  page,
  data,
  paginatedData,
  setPaginatedData,
  isDataFetched,
  books,
  setData,
  Actions,
  deleteUrl,
  checkboxesEnabled = false,
  tableTemplate,
  actionCols,
  selected = [],
  setSelected,
  props,
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState(selected);
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
    setTableStructure(
      typeof tableTemplate === "object"
        ? Object.keys(tableTemplate)
        : data.length && Object.keys(data[0])
    );

    if (isDataFetched) {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setSelected && setSelected(selectedUsers);
  }, [selectedUsers]);

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
          <table className="w-full text-xs text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {checkboxesEnabled && (
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        onChange={handleCheckChange}
                        checked={
                          paginatedData.curItems.length !== 0 &&
                          paginatedData.curItems.every((e) =>
                            selectedUsers.includes(e.id)
                          )
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer focus:ring-blue-500"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                )}
                {/* Other Columns */}
                {tableStructure?.map(
                  (key) =>
                    key !== "Images" &&
                    key[0] !== "_" && (
                      <th
                        key={key}
                        scope="col"
                        className="px-6 py-3 text-center"
                      >
                        {key === "id" &&
                        page !== "Notification Promotion" &&
                        page !== "Users Management"
                          ? "S/N"
                          : key === "u_id"
                          ? "user id"
                          : key === "app_page"
                          ? "web link"
                          : key.replace("_", " ")}
                      </th>
                    )
                )}

                {/* Action Columns */}
                {actionCols?.map((elem) => (
                  <th key={elem} scope="col" className="px-6 py-3 text-center">
                    {elem}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs">
              {paginatedData.curItems.length ? (
                <Users
                  {...{
                    page,
                    tableStructure,
                    selectedUsers,
                    setSelectedUsers,
                    paginatedData,
                    setPaginatedData,
                    checkboxesEnabled,
                    actionCols,
                    deleteUrl,
                    books,
                    setData,
                    Actions,
                    props,
                  }}
                />
              ) : (
                <tr className="bg-white border-b">
                  <td
                    colSpan={
                      tableStructure?.length + actionCols?.length + 1 ||
                      Object.keys(tableTemplate).length
                    }
                    className="w-4 p-4 text-center"
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
  page,
  tableStructure,
  selectedUsers,
  setSelectedUsers,
  paginatedData,
  checkboxesEnabled,
  setPaginatedData,
  actionCols,
  books,
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
            page,
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
            checkboxesEnabled,
            actionCols,
            books,
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
            page,
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
            checkboxesEnabled,
            paginatedData,
            setPaginatedData,
            books,
            actionCols,
            setData,
            deleteUrl,
            Actions,
            props,
          }}
        />
      ));
};

const SingleUser = ({
  page,
  tableStructure,
  data,
  setData,
  id,
  checkboxesEnabled,
  selectedUsers,
  setSelectedUsers,
  paginatedData,
  setPaginatedData,
  books,
  deleteUrl,
  actionCols,
  Actions,
  props,
}) => {
  const [toggleText, setToggleText] = useState(false);
  const handleCheckChange = (e) => {
    selectedUsers.includes(id)
      ? setSelectedUsers((prev) => prev.filter((e) => e !== id))
      : setSelectedUsers((prev) => [...prev, id]);
  };

  return (
    <tr className="bg-white border-b">
      {checkboxesEnabled && (
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              id={"checkbox-table-search-" + id}
              type="checkbox"
              checked={selectedUsers.includes(id)}
              onChange={handleCheckChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer focus:ring-blue-500"
            />
            <label htmlFor={"checkbox-table-search-" + id} className="sr-only">
              checkbox
            </label>
          </div>
        </td>
      )}
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
                data[key] ? (
                  <img
                    className="w-10 mx-auto"
                    src={data[key]}
                    alt={data.title}
                  />
                ) : (
                  "No Image!"
                )
              ) : key === "privilage" ? (
                "true"
              ) : key === "app_page" && data[key] ? (
                <a
                  href={data[key]}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {data[key]}
                </a>
              ) : key === "start_date" || key === "_end_date" ? (
                data[key].replace(/ ?00:00:00/, "")
              ) : key === "book_name" && data[key] ? (
                books.filter((e) => e.id == data[key])[0].title ||
                "Book name not found!"
              ) : key === "app_page" && !data[key] ? (
                "No data!"
              ) : (key === "text" || key === "subject") &&
                (page === "Feedbacks Management" ||
                  page === "Contact Management") ? (
                data[key].length > 30 && !toggleText ? (
                  <>
                    {`${data[key].slice(0, 30)}...`}{" "}
                    <em
                      onClick={() => setToggleText(!toggleText)}
                      className="text-blue-500 cursor-pointer"
                    >
                      read more
                    </em>
                  </>
                ) : data[key].length > 30 ? (
                  <>
                    {data[key]}{" "}
                    <em
                      onClick={() => setToggleText(!toggleText)}
                      className="text-blue-500 cursor-pointer"
                    >
                      read less
                    </em>
                  </>
                ) : (
                  data[key]
                )
              ) : Array.isArray(data[key]) ? (
                data[key].join(", ")
              ) : data[key] === null ? (
                "No data!"
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
            page,
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

export default AdvancedTable;
