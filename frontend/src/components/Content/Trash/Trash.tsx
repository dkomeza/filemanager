import React, { useEffect } from "react";
import getCurrentIcon from "../helpers/getCurrentIcon";

function Trash() {
  useEffect(() => {
    document.title = "Trash";
    getCurrentIcon("trash");
  });
  return <main>Trash</main>;
}

export default Trash;
