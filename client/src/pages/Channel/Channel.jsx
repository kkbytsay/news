import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader.jsx";
import Post from "../../components/Post/Post.jsx";

export default function Channel() {
  let { channelId } = useParams();
  const { data, isLoading, error } = useFetch(`/articles/channel/${channelId}`);

  return (
    <div className="channel-page">
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      <div className="posts">
        {data && data.map((post) => <Post post={post} />)}
      </div>
    </div>
  );
}
