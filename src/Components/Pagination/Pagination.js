import React from "react";
import ReactPaginate from "react-paginate";
import { newsProviderPerPage } from "../../ConfigUI/configEnv";
import styles from "./Pagination.module.css";
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
          containerClassName={styles.paginate}
          breakClassName={styles.break}
          activeLinkClassName={styles.activeLink}
          activeClassName={styles.active}
          previousClassName={styles.prev}
          nextClassName={styles.next}
          pageLinkClassName={styles.pageLink}
          forcePage={currentPageNumber - 1}
        />
      </span>
    </>
  );
};

export default Pagination;
