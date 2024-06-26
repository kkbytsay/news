import Explore from "../pages/Explore.jsx";
import Home from "../pages/Home/Home.jsx";
import Saved from "../pages/Saved.jsx";
import Subscriptions from "../pages/Subscriptions.jsx";

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
    path: "saved",
    Component: Saved,
  },

  {
    path: "subscriptions",
    Component: Subscriptions,
  },
];

export default routes;
