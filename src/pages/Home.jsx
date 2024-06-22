import React, { useEffect, useState } from "react";
import Post from "../components/Post.jsx";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(process.env.API_URL + "/articles")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div className="page__content">
      <h2 className="heading">Explore Channels</h2>
      <div className="posts">
        {posts.map((post) => (
          <Post post={post} />
        ))}
        {posts.map((post) => (
          <Post post={post} />
        ))}
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
