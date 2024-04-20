import React, { useEffect, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { Navigate, Outlet } from "react-router-dom";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
      <div>
        <NavBar loggedIn={loggedIn} />
        <Header />
        <Outlet context={{ "setLoggedIn" : setLoggedIn }} />
        { !loggedIn ? <Navigate to="/login" /> : null }
      </div>
  );
}

export default App;
