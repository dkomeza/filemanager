import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@Content/Sidebar/Sidebar";

import "./ContentRouter.scss";

function ContentRouter() {
  return (
    <div className="root">
      <Sidebar />
      <Routes>
        <Route path="/" element={<main>Home</main>} />
      </Routes>
    </div>
  );
}

export default ContentRouter;
