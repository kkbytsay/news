import { useState } from "react";
import createArray from "../utils/createArray";

const DOTS = "...";

export default function usePagination(counter, pageSize) {
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);
  const [page, setPage] = useState(1);

  let pagesArray;
  const siblingCount = 1;
  const totalPageNumber = siblingCount + 5;
  const totalPageCount = counter ? Math.ceil(counter.count / pageSize) : 1;

  if (totalPageNumber >= totalPageCount) {
    pagesArray = createArray(1, totalPageCount);
  }
  const leftSiblingIndex = Math.max(page - siblingCount, 1);
  const rightSiblingIndex = Math.min(page + siblingCount, totalPageCount);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = createArray(1, leftItemCount);

    pagesArray = [...leftRange, DOTS, totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = createArray(
      totalPageCount - rightItemCount + 1,
      totalPageCount
    );
    pagesArray = [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = createArray(leftSiblingIndex, rightSiblingIndex);
    pagesArray = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  function paginate(e) {
    setPage(e);
  }

  function nextPage(pageNumber) {
    if (pageNumber < totalPageCount) setPage(pageNumber + 1);
  }

  function prevPage(pageNumber) {
    if (pageNumber !== 1) setPage(pageNumber - 1);
  }

  return {
    nextPage,
    prevPage,
    paginate,
    page,
    pagesArray,
    itemsPerPage,
    DOTS,
  };
}
