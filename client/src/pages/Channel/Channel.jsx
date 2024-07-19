import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader.jsx";
import Post from "../../components/Post/Post.jsx";
import Heading from "../../components/Heading/Heading.jsx";
import usePagination from "../../hooks/usePagination.js";
import Pagination from "../../components/Pagination/Pagination.jsx";

export default function Channel() {
  let { channelId } = useParams();

  const {
    data: counter,
    isLoading: isCounterLoaded,
    error: counterError,
  } = useFetch(`/channel/${channelId}/count`);

  const {
    data: channel,
    isLoading: isChannelLoading,
    error: channelError,
  } = useFetch(`/channel/${channelId}`);

  const { nextPage, prevPage, paginate, page, pagesArray, itemsPerPage, DOTS } =
    usePagination(counter, 10);

  const { data, isLoading, error } = useFetch(
    `/articles/channel/${channelId}/params/${page}&${itemsPerPage}`
  );
  return (
    <div className="page__content">
      {isChannelLoading && <Loader />}
      {channelError && <div>{channelError}</div>}
      {channel && <Heading>News from {channel.name} </Heading>}
      <div className="posts-container">
        {isLoading && <Loader />}
        {error && <div>{error}</div>}
        {data && (
          <div className="posts">
            {data.items.map((post) => (
              <Post post={post} />
            ))}
          </div>
        )}
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
      </div>
    </div>
  );
}
