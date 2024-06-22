import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

function Pagination({ items, setDaftarCerita }) {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    console.log('handlePageClick called');
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    handleKeyDown();
  };

  const handleKeyDown = () => {
    const target = document.getElementById('targetSearch');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setDaftarCerita(currentItems);
  }, [itemOffset, items]);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
}

export default Pagination;
