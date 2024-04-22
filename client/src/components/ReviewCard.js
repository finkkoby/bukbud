import React from "react";

function ReviewCard({ review }) {
    return (
        <div key={review.id} className="review-card">
            <h2>{review.book.title} by {review.book.author.name}</h2>
            <h5>{review.rating} stars</h5>
            <p>{review.comment}</p>
            <small>{review.user.username}</small>
        </div>
    );
}

export default ReviewCard;