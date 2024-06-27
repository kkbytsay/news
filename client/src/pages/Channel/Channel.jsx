import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader.jsx";
export default function Channel() {
  let { channelId } = useParams();
  const { data, isLoading, error } = useFetch(`/channel/${channelId}`);

  return (
    <div className="channel-page">
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      <div className="channels">{JSON.stringify(data)}</div>;
    </div>
  );
}
