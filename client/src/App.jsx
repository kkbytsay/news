import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./consts/routes.js";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Page from "./components/Page/Page.jsx";

function App() {
  return (
    <BrowserRouter basename={process.env.BASE_URL}>
      <Page>
        <Sidebar />
        <Routes>
          {routes.map((route) => {
            return <Route path={route.path} element={<route.Component />} />;
          })}
        </Routes>
      </Page>
    </BrowserRouter>
  );
}

export default App;
