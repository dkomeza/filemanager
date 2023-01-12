import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Content/Navbar/Navbar";
import { useState } from "react";

import "./ContentRouter.scss";
import Dashboard from "./Dashboard/Dashboard";
import Files from "./Files/Files";
import Favourite from "./Favourite/Favourite";
import Trash from "./Trash/Trash";
import Settings from "./Settings/Settings";
import Sidebar from "./Sidebar/Sidebar";

function ContentRouter() {
  const [update, setUpdate] = useState(false);
  return (
    <div className="root">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/files/*" element={<Files update={update} />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Sidebar callback={setUpdate} />
    </div>
  );
}

export default ContentRouter;
