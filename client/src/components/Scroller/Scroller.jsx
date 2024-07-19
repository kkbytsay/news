import React from "react";
import "./scroller.scss";
export default function Scroller({ children }) {
  const handleScroll = (event) => {
    const container = event.target;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroller" onWheel={handleScroll}>
      {children}
    </div>
  );
}
