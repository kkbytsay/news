import React from "react";
import { Link } from "react-router-dom";
import "./channel.scss";
export default function Channel(props) {
  return (
    <Link to={`/channel/${props.channel.id}`} className="channel-link">
      <div className="channel">
        <h3 className="channel__title">{props.channel.name}</h3>
      </div>
    </Link>
  );
}
