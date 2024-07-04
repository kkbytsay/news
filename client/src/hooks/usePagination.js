import { useState } from "react";

export default function usePagination(counter, pageSize) {
  const [pages, setPages] = useState(counter / pageSize);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);
  const [page, setPage] = useState(1);

  function calcPages() {
    setItemsPerPage(pageSize);
    setPages(counter / pageSize);
  }

  function paginate(e) {
    setPage(e);
    console.log("pushed on" + e);
  }

  function nextPage(pageNumber) {
    if (pageNumber < pages) setPage(pageNumber + 1);
  }

  function prevPage(pageNumber) {
    if (pageNumber !== 1) setPage(pageNumber - 1);
  }

  return { nextPage, prevPage, paginate, page, pages, calcPages, itemsPerPage };
}
