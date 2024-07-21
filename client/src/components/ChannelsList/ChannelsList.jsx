import React from "react";
import Section from "../Section/Section.jsx";
import Heading from "../Heading/Heading.jsx";
import Loader from "../Loader/Loader.jsx";
import useFetch from "../../hooks/useFetch.js";
import Channel from "../Channel/Channel.jsx";

import "./channelslist.scss";
export default function ChannelsList() {
  const {
    data: channels,
    isLoading: isChannelsLoading,
    error: channelsError,
  } = useFetch("/channels");
  return (
    <Section className=" channels-section">
      <Heading>Explore channels</Heading>
      {isChannelsLoading && <Loader />}
      {channelsError && <div>{channelsError}</div>}
      <div className="channels">
        {channels && channels.map((channel) => <Channel channel={channel} />)}
      </div>
    </Section>
  );
}
