import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar"
import Header from "./Header"
import Login from "./Login"
import Signup from "./Signup"



function App() {
  const [signup, setSignup] = useState(false);
  const [user, setUser] = useState(null)
  const [reviews, setReviews] = useState([])
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)

  const navigate = useNavigate()

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

  useEffect(() => {
    fetch('http://localhost:5555/api/books')
    .then((r) => {
       if (r.ok) {
         r.json().then((res) => {
           setBooks(res)
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
          "setSignup": setSignup,
          "user": user,
          "setUser": setUser,
          "reviews": reviews,
          "setReviews": setReviews,
          "books": books,
          "setBooks": setBooks,
          "navigate": navigate,
          "error": error,
          "setError": setError
          }} />
      </div>
  );
}

export default App;
