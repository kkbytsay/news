import React from "react";
import createArray from "../../utils/createArray";
import "./pagination.scss";
export default function Pagination(props) {
  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item prev">
          <button
            onClick={() => props.prevPage(props.page)}
            className="pagination__btn"
          >
            {"<<"}
          </button>
        </li>
        {console.log(props.pages)}
        {props.pages.map((item) => {
          return item == props.DOTS ? (
            <li className="pagination__item ">
              <button className="pagination__btn">{item}</button>
            </li>
          ) : (
            <li
              className={
                props.page == item
                  ? "pagination__item pagination__item_active"
                  : "pagination__item"
              }
            >
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
            {">>"}
          </button>
        </li>
      </ul>
    </div>
  );
}
