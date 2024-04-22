import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar"
import Header from "./Header"
import Login from "./Login"
import Signup from "./Signup"



function App() {
  const [signup, setSignup] = useState(false);
  const [user, setUser] = useState(null)
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5555/api/check-session').then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5555/api/reviews')
    .then((r) => {
       if (r.ok) {
         r.json().then((res) => {
           setReviews(res)
         })
       }
       else {
         r.json().then((res) => {
           setError(res.error)
         })
       }
    })
  }, [])

  function handleLogout() {
    fetch('http://localhost:5555/api/logout').then((response) => {
        if (response.ok) {
            response.json().then(() => {
              setSignup(false)
              setUser(null)
            });
        }
    });
}

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
        <NavBar handleLogout={handleLogout} />
        <Header />
        <Outlet context={{
          "signup": signup,
          "user": user,
          "setSignup": setSignup,
          "setUser": setUser,
          "reviews": reviews
          }} />
      </div>
  );
}

export default App;
