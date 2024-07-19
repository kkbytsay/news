import Channel from "../pages/Channel/Channel.jsx";
import Explore from "../pages/Explore/Explore.jsx";
import Home from "../pages/Home/Home.jsx";
import Post from "../pages/Post/Post.jsx";

const routes = [
  {
    path: "",
    Component: Home,
  },
  {
    path: "explore",
    Component: Explore,
  },
  {
    path: "channel/:channelId",
    Component: Channel,
  },
  {
    path: "article/:articleId",
    Component: Post,
  },
];

export default routes;
