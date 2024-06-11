import React from "react";
import Logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <header className="header">
      <img src={Logo} alt="" className="header__logo logo" />
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
        <li className="navigation__item">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " navigation__link_active navigation__link"
                : "navigation__link"
            }
            to="/saved"
          >
            Saved
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " navigation__link_active navigation__link"
                : "navigation__link"
            }
            to="/subscriptions"
          >
            Subcriptions
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Sidebar;
