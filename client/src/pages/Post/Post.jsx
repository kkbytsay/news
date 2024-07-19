import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Heading from "../../components/Heading/Heading.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Section from "../../components/Section/Section.jsx";
import imageErrorHandler from "../../utils/imageErrorHandler";
import formatDate from "../../utils/formatDate.js";
import { images } from "../../consts/images";
import "./post.scss";

export default function Post() {
  let { articleId } = useParams();

  const { data, isLoading, error } = useFetch(`/article/${articleId}`);

  return (
    <div className="page__content">
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      {data && (
        <Section>
          <div className="article">
            <Heading>{data.title}</Heading>
            <img
              src={data.image_url ? data.image_url : images.thumbnailStub}
              alt="Article thumbnail"
              className="article__thumbnail"
              onError={(e) => imageErrorHandler(e)}
            />
            <div className="article__info">
              <p>{data.author}</p>
              <p>{formatDate(data.create_date)}</p>
            </div>
            <p className="article__content">{data.content}</p>
          </div>
        </Section>
      )}
    </div>
  );
}
