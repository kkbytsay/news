import React from "react";

export default function Channel(props) {
  return (
    <div className="channel">
      <img src={props.channel.logoUrl} />
      <h3 className="channel_title">{props.channel.name}</h3>
    </div>
  );
}
