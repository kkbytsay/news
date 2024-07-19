import React from "react";
import "./section.scss";
export default function Section({ children }) {
  return (
    <section className="section">
      <div className="content">{children}</div>
    </section>
  );
}
