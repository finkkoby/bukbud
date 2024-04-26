import React from "react";

import { useOutletContext } from "react-router-dom";

function BookCard({ book }) {
    const { navigate, setReviewBook } = useOutletContext()

    function handleClick(e) {
        setReviewBook(book)
        navigate(`/add-new-review`)
    }

    return (
        <div className="book-card" onClick={handleClick}>
            <div className="book-image">
                <img src={book.image} alt={book.title} />
            </div>
            <h3>"{book.title}"</h3>
            <small>by {book.author.name}</small>
        </div>
    );
}

export default BookCard;