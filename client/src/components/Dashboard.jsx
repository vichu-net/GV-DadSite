import React from "react";
import NavBar from "./navbar";

function Dashboard() {
  

  return (
    <>
      <NavBar />
      <div style={{ padding: "2rem" }}>
        <h1>🎉 Welcome to the Dashboard!</h1>
        <p>This is a protected page after login.</p>
      </div>
    </>

  );
}

export default Dashboard;
