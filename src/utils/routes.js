import Explore from "../pages/Explore.jsx";
import Home from "../pages/Home.jsx";
import Saved from "../pages/Saved.jsx";
import Subscriptions from "../pages/Subscriptions.jsx";

const routes = [
  {
    path: process.env.BASE_URL + "",
    Component: Home,
  },
  {
    path: process.env.BASE_URL + "explore",
    Component: Explore,
  },
  {
    path: process.env.BASE_URL + "saved",
    Component: Saved,
  },

  {
    path: process.env.BASE_URL + "subscriptions",
    Component: Subscriptions,
  },
];

export default routes;
