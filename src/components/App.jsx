import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "../utils/routes.js";
import Sidebar from "./Sidebar.jsx";

function App() {
  return (
    <BrowserRouter basename={process.env.BASE_URL}>
      <Sidebar />
      <Routes>
        {routes.map((route) => {
          return <Route path={route.path} element={<route.Component />} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
