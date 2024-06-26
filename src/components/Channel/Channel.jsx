import React from "react";
import { Link } from "react-router-dom";

export default function Channel(props) {
  return (
    <Link to={`/channel?${props.channel.channelId}`}>
      <div className="channel">
        <img className="channel__image" src={props.channel.logoUrl} />
        <h3 className="channel__title">{props.channel.name}</h3>
      </div>
    </Link>
  );
}
