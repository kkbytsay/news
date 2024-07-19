import React, { useEffect, useMemo, useState } from "react";
import Post from "../../components/Post/Post.jsx";
import useFetch from "../../hooks/useFetch.js";
import Loader from "../../components/Loader/Loader.jsx";
import Channel from "../../components/Channel/Channel.jsx";
import Heading from "../../components/Heading/Heading.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import usePagination from "../../hooks/usePagination.js";
import Section from "../../components/Section/Section.jsx";
import "./home.scss";
function Home() {
  const {
    data: counter,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useFetch("/articles/count");

  const { nextPage, prevPage, paginate, page, pagesArray, itemsPerPage, DOTS } =
    usePagination(counter, 10);

  const {
    data: posts,
    isLoading: isPostsLoading,
    error: postsError,
  } = useFetch(`/articles/params/${page}&${itemsPerPage}`);

  const {
    data: channels,
    isLoading: isChannelsLoading,
    error: channelsError,
  } = useFetch("/channels");

  return (
    <div className="page__content">
      <Section className=" channels-section">
        <Heading>Explore channels</Heading>
        {isChannelsLoading && <Loader />}
        {channelsError && <div>{channelsError}</div>}
        <div className="channels">
          {channels && channels.map((channel) => <Channel channel={channel} />)}
        </div>
      </Section>
      <Section className="section headlines-section">
        <Heading>Today's Headlines</Heading>
        {isPostsLoading && <Loader />}
        {postsError && <div>{postsError}</div>}
        <div className="posts">
          {posts && posts.items.map((post) => <Post post={post} />)}
        </div>
        {counter && (
          <Pagination
            nextPage={(e) => nextPage(e)}
            prevPage={(e) => prevPage(e)}
            paginate={(e) => paginate(e)}
            page={page}
            pages={pagesArray}
            DOTS={DOTS}
          />
        )}
      </Section>
    </div>
  );
}

export default Home;
