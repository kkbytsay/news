import React from "react";
import Loader from "../../components/Loader/Loader.jsx";
import Section from "../../components/Section/Section.jsx";
import Heading from "../../components/Heading/Heading.jsx";
import Post from "../../components/Post/Post.jsx";
import useFetch from "../../hooks/useFetch.js";
import Scroller from "../../components/Scroller/Scroller.jsx";

function Explore() {
  const { data, isLoading, error } = useFetch("/channels/explore");

  return (
    <div className="page__content">
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      {data &&
        data.map((item) => {
          return (
            <Section className="section explore-section">
              <Heading>{item.channel.name}</Heading>
              <Scroller>
                {item.articles.map((article) => (
                  <Post post={article} />
                ))}
              </Scroller>
            </Section>
          );
        })}
    </div>
  );
}
export default Explore;
