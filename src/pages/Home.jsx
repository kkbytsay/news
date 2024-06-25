import React from "react";
import Post from "../components/Post.jsx";
import useFetch from "../hooks/useFetch.js";
import Loader from "../components/Loader.jsx";
import Channel from "../components/Channel.jsx";
function Home() {
  const {
    data: posts,
    isLoading: isPostsLoading,
    error: postsError,
  } = useFetch("/articles");
  const {
    data: channels,
    isLoading: isChannelsLoading,
    error: channelsError,
  } = useFetch("/channels");
  return (
    <div className="page__content">
      <h2 className="heading">Explore chanels</h2>
      {isChannelsLoading && <Loader />}
      {channelsError && <div>{channelsError}</div>}
      <div className="channels">
        {channels && channels.map((channel) => <Channel channel={channel} />)}
      </div>
      <h2 className="heading">Today’s Headlines</h2>
      {isPostsLoading && <Loader />}
      {postsError && <div>{postsError}</div>}
      <div className="posts">
        {posts && posts.map((post) => <Post post={post} />)}
      </div>
    </div>
  );
}

export default Home;
