import React from "react";
import Post from "../../components/Post/Post.jsx";
import useFetch from "../../hooks/useFetch.js";
import Loader from "../../components/Loader/Loader.jsx";
import Channel from "../../components/Channel/Channel.jsx";
import Heading from "../../components/Heading/Heading.jsx";
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
      <Heading>Explore chanels</Heading>
      {isChannelsLoading && <Loader />}
      {channelsError && <div>{channelsError}</div>}
      <div className="channels">
        {channels && channels.map((channel) => <Channel channel={channel} />)}
      </div>
      <Heading>Today's Headlines</Heading>
      {isPostsLoading && <Loader />}
      {postsError && <div>{postsError}</div>}
      <div className="posts">
        {posts && posts.map((post) => <Post post={post} />)}
      </div>
    </div>
  );
}

export default Home;
