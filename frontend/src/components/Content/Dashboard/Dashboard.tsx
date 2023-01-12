import React, { useEffect } from "react";

import { useAuth } from "@Auth/context/AuthContext";

import getCurrentIcon from "../helpers/getCurrentIcon";

function Dashboard() {
  const { signOut } = useAuth()!;
  useEffect(() => {
    document.title = "Dashboard";
    getCurrentIcon("dashboard");
  });
  return <main onClick={signOut}>Dashboard</main>;
}

export default Dashboard;
