import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar"
import Header from "./Header"
import Login from "./Login"
import Signup from "./Signup"



function App() {
  const [signup, setSignup] = useState(false);
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5555/api/check-session').then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) {
    return (
      <>
        <Header />
        { signup ? <Signup setSignup={setSignup} setUser={setUser} /> : <Login setSignup={setSignup} setUser={setUser} />}
      </>
    );
  }
  

  return (
      <div>
        <NavBar />
        <Header />
        <Outlet context={{
          "signup": signup,
          "user": user,
          "setSignup": setSignup,
          "setUser": setUser
          }} />
      </div>
  );
}

export default App;
