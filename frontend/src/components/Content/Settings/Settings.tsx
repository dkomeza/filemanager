import React, { useEffect } from "react";
import getCurrentIcon from "../helpers/getCurrentIcon";

function Settings() {
  useEffect(() => {
    document.title = "Settings";
    getCurrentIcon("settings");
  });
  return <main>Settings</main>;
}

export default Settings;
