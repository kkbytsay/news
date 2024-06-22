import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "../consts/routes.js";
import Sidebar from "./Sidebar.jsx";

function App() {
  return (
    <BrowserRouter basename={process.env.BASE_URL}>
      <div className="page">
        <Sidebar />
        <Routes>
          {routes.map((route) => {
            return <Route path={route.path} element={<route.Component />} />;
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
