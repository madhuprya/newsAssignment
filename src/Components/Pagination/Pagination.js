import React from "react";
import ReactPaginate from "react-paginate";
import { newsProviderPerPage } from "../../ConfigUI/configEnv";
const Pagination = (props) => {
  const { handlePageClick, totalNewsProvider, currentPageNumber } = props;
  return (
    <>
      <span className="paginate">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          pageCount={Math.ceil(totalNewsProvider / newsProviderPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="paginate"
          breakClassName="break"
          activeLinkClassName="activeLink"
          activeClassName="active"
          previousClassName="prev"
          nextClassName="next"
          pageLinkClassName="pageLink"
          forcePage={currentPageNumber - 1}
        />
      </span>
    </>
  );
};

export default Pagination;
