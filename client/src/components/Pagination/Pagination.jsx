import React from "react";
import usePagination from "../../hooks/usePagination";
import createArray from "../../utils/createArray";

export default function Pagination(props) {
  console.log(props);
  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item prev">
          <button
            onClick={() => props.prevPage(props.page)}
            className="pagination__btn"
          >
            prev
          </button>
        </li>

        {createArray(props.pages).map((item) => {
          return (
            <li className="pagination__item ">
              <button
                onClick={() => props.paginate(item)}
                className="pagination__btn"
              >
                {item}
              </button>
            </li>
          );
        })}
        <li className="pagination__item next">
          <button
            onClick={() => props.nextPage(props.page)}
            className="pagination__btn"
          >
            next
          </button>
        </li>
        {props.page}
      </ul>
    </div>
  );
}
