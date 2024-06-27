import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../consts/images";
import headingSlise from "../../utils/headingSlice";
import formatDate from "../../utils/formatDate";

function Post(props) {
  return (
    <div className="post">
      <img
        src={
          props.post.urlToImage ? props.post.urlToImage : images.thumbnailStub
        }
        alt="Article thumbnail"
        className="post__thumbnail"
      />
      <div className="post__container">
        <Link to={"/post?" + props.post.id} className="post__link">
          <h2 className="post__title">{headingSlise(props.post.title)}</h2>
        </Link>
        <div className="post_info">
          <p className="post__publisher">{props.post.source.name}</p>
          <p className="post__date">{formatDate(props.post.publishedAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
