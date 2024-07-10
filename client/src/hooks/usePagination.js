import { useState } from "react";

export default function usePagination(counter, pageSize) {
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);
  const [page, setPage] = useState(1);

  let pages = counter ? counter.count / pageSize : 1;

  function calcPages() {
    setItemsPerPage(pageSize);
    pages = counter / pageSize;
  }

  console.log(pages);

  function paginate(e) {
    setPage(e);
  }

  function nextPage(pageNumber) {
    if (pageNumber < pages) setPage(pageNumber + 1);
  }

  function prevPage(pageNumber) {
    if (pageNumber !== 1) setPage(pageNumber - 1);
  }

  return { nextPage, prevPage, paginate, page, pages, calcPages, itemsPerPage };
}
