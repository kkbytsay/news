import React from "react";
import { Link } from "react-router-dom";

function Post(props) {
  return (
    <div className="post">
      <img
        src={props.post.urlToImage}
        alt=""
        className="post__thumbnail"
        srcset=""
      />
      <div className="post__container">
        <Link to={"/post?" + props.post.id}>
          <h2 className="post__title">{props.post.title}</h2>
        </Link>
        <div className="post_info">
          <p className="post__publisher">{props.post.source.name}</p>
          <p className="post__time">{console.log(props.post)}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
//** */ post.publishedAt.toISOString().split("T")[0]
