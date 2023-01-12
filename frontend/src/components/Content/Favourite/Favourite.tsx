import React, { useEffect } from "react";
import getCurrentIcon from "../helpers/getCurrentIcon";

function Favourite() {
  useEffect(() => {
    document.title = "Favourite";
    getCurrentIcon("favourite");
  });
  return <main>Favourite</main>;
}

export default Favourite;
