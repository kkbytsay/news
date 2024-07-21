import React from "react";
import { NavLink } from "react-router-dom";
import "./channel.scss";
export default function Channel(props) {
  return (
    <NavLink
      to={`/channel/${props.channel.id}`}
      className={({ isActive }) =>
        isActive ? "channel-link channel-link_active" : "channel-link"
      }
    >
      <div className="channel">
        <h3 className="channel__title">{props.channel.name}</h3>
      </div>
    </NavLink>
  );
}
