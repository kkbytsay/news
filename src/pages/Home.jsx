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
    <div>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}

export default Home;
