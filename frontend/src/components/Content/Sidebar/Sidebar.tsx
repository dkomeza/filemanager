import React from "react";
import { useAuth } from "@Auth/context/AuthContext";

function Sidebar() {
  const { currentUser, signOut } = useAuth()!;
  return (
    <aside>
      <h1>Sidebar</h1>
      <p>Current user: {currentUser?.username}</p>
      <button onClick={signOut}>Sign out</button>
    </aside>
  );
}

export default Sidebar;
