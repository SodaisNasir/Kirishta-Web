import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { paginationEntries } from "../constants/data";

function Pagination({ paginatedData, setPaginatedData }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPageState, setItemsPerPageState] = useState(50);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  useEffect(() => {
    const endOffset = itemsPerPageState;
    const curItems = paginatedData.items.slice(0, endOffset);
    setPageCount(Math.ceil(paginatedData.items.length / itemsPerPageState));
    console.log(`Loading items from ${0} to ${endOffset}`);
    setPaginatedData((prev) => ({ ...prev, curItems }));
  }, [paginatedData.items, itemsPerPageState]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPageState;
    const curItems = paginatedData.items.slice(itemOffset, endOffset);
    setPageCount(Math.ceil(paginatedData.items.length / itemsPerPageState));
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setPaginatedData((prev) => ({ ...prev, curItems }));
  }, [itemOffset]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPageState) % paginatedData.items.length;
    setItemOffset(newOffset);
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
  };

  const handleSelect = (e) => {
    const value = e.target.value;

    value === "All"
      ? setItemsPerPageState(paginatedData.items.length)
      : setItemsPerPageState(value);
  };

  return (
    <div className="w-full flex items-center justify-between text-xs">
      {paginatedData.items.length ? (
        <p className="flex items-center mb-2 mt-1">
          Show&nbsp;&nbsp;
          <select
            defaultValue={50}
            onChange={handleSelect}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 py-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {paginationEntries.map((item) => (
              <option className="text-xs" key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          &nbsp;&nbsp;entries
        </p>
      ) : (
        ""
      )}

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        className="flex justify-center items-center space-x-1 text-sm p-2.5 py-4 overflow-x-auto"
        activeLinkClassName="px-2.5 py-1 !bg-blue-700 text-white"
        breakLinkClassName="px-2.5 py-1 bg-blue-200 rounded-md hover:bg-blue-700 hover:text-white"
        pageLinkClassName="px-2.5 py-1 bg-blue-200 rounded-md hover:bg-blue-700 hover:text-white"
        nextLinkClassName="px-4 py-1.5 bg-blue-200 text-xs rounded-md hover:bg-blue-700 hover:text-white whitespace-nowrap"
        previousLinkClassName="px-4 py-1.5 bg-blue-200 text-xs rounded-md hover:bg-blue-700 hover:text-white whitespace-nowrap"
        disabledClassName="opacity-90 cursor-not-allowed saturate-0"
        disabledLinkClassName="opacity-90 cursor-not-allowed saturate-0"
      />
    </div>
  );
}

export default Pagination;
