import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Paginatation({
  itemsPerPage,
  paginatedData,
  setPaginatedData,
  children,
}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  useEffect(() => {
    const endOffset = itemsPerPage;
    const curItems = paginatedData.items.slice(0, endOffset);
    setPageCount(Math.ceil(paginatedData.items.length / itemsPerPage));
    console.log(`Loading items from ${0} to ${endOffset}`);
    setPaginatedData((prev) => ({ ...prev, curItems }));
  }, [paginatedData.items]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const curItems = paginatedData.items.slice(itemOffset, endOffset);
    setPageCount(Math.ceil(paginatedData.items.length / itemsPerPage));
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setPaginatedData((prev) => ({ ...prev, curItems }));
  }, [itemOffset]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % paginatedData.items.length;
    setItemOffset(newOffset);
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
  };

  return (
    <>
      {children}
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        className="flex justify-center items-center space-x-1 text-sm p-2.5 py-4"
        activeLinkClassName="px-2.5 py-1 !bg-blue-700 text-white rounded-md"
        breakLinkClassName="px-2.5 py-1 bg-blue-200 rounded-md hover:bg-blue-700 hover:text-white"
        pageLinkClassName="px-2.5 py-1 bg-blue-200 rounded-md hover:bg-blue-700 hover:text-white"
        nextLinkClassName="px-4 py-1.5 bg-blue-200 text-xs rounded-md hover:bg-blue-700 hover:text-white"
        previousLinkClassName="px-4 py-1.5 bg-blue-200 text-xs rounded-md hover:bg-blue-700 hover:text-white"
        disabledClassName="hidden"
        disabledLinkClassName="hidden"
      />
    </>
  );
}

export default Paginatation;
