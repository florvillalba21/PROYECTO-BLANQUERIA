import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import './../../public/css/style.css';

const Pagination = ({ pageCount, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    onPageChange(currentPage + 1);
  }, [currentPage, onPageChange]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination-container"}
      pageClassName={"pagination-page"}
      pageLinkClassName={"pagination-link"}
      previousClassName={"pagination-previous"}
      nextClassName={"pagination-next"}
      previousLinkClassName={"pagination-link"}
      nextLinkClassName={"pagination-link"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
