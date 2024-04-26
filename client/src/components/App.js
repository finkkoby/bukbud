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
  const [authors, setAuthors] = useState([])
  const [error, setError] = useState(null)
  const [reviewBook, setReviewBook] = useState(null)
  const [reviewRating, setReviewRating] = useState(null)
  const [reviewComment, setReviewComment] = useState(null)


  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/check-session').then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch('/api/reviews')
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
    fetch('/api/books')
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
  
  useEffect(() => {
    fetch('/api/authors')
    .then((r) => {
       if (r.ok) {
         r.json().then((res) => {
           setAuthors(res)
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
    fetch('/api/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        if (response.ok) {
            console.log(response)
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

  const sortedBooks = books.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  })
  

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
          "books": sortedBooks,
          "setBooks": setBooks,
          "navigate": navigate,
          "authors": authors,
          "setAuthors": setAuthors,
          "error": error,
          "setError": setError,
          "reviewBook": reviewBook,
          "setReviewBook": setReviewBook,
          "reviewRating": reviewRating,
          "setReviewRating": setReviewRating,
          "reviewComment": reviewComment,
          "setReviewComment": setReviewComment,
          }} />
      </div>
  );
}

export default App;
