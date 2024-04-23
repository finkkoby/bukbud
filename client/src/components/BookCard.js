import React from "react";

function BookCard({ book }) {
    return (
        <div className="book-card">
            <div className="book-image">
                <img src={book.image} alt={book.title} />
            </div>
            <h3>"{book.title}"</h3>
            <small>by {book.author.name}</small>
        </div>
    );
}

export default BookCard;