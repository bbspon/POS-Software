import React, { useState } from "react";

const Pagination = ({ totalItems, itemsPerPage, onPageChange = () => {} }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page); // This will always be a function
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        &laquo; Prev
      </button>

      {pageNumbers.map((page) => (
        <button key={page} className={page === currentPage ? "active" : ""} onClick={() => handlePageChange(page)}>
          {page}
        </button>
      ))}

      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
