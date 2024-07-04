import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader.jsx";
import Post from "../../components/Post/Post.jsx";
import Heading from "../../components/Heading/Heading.jsx";

export default function Channel() {
  let { channelId } = useParams();
  const { data, isLoading, error } = useFetch(`/articles/channel/${channelId}`);
  const {
    data: channel,
    isLoading: isChannelLoading,
    error: channelError,
  } = useFetch(`/channel/${channelId}`);
  return (
    <div className="channel-page">
      {isChannelLoading && <Loader />}
      {channelError && <div>{channelError}</div>}
      {channel && <Heading>News from {channel.name} </Heading>}
      <div className="posts-container">
        {isLoading && <Loader />}
        {error && <div>{error}</div>}
        <div className="posts">
          {data && data.map((post) => <Post post={post} />)}
        </div>
      </div>
    </div>
  );
}
