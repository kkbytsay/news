import React from "react";
import { images } from "../../consts/images";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";
function Sidebar() {
  return (
    <header className="header page__header">
      <img src={images.logo} alt="" className="header__logo logo" />
      <ul className="header__navigation navigation">
        <li className="navigation__item">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " navigation__link_active navigation__link"
                : "navigation__link"
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " navigation__link_active navigation__link "
                : "navigation__link"
            }
            to="/explore"
          >
            Explore
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Sidebar;
