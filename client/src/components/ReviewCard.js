import React from "react";

function ReviewCard({ review }) {
    return (
        <div key={review.id} className="review-card">
            <div className="book-image">
                <img src={review.book.image} alt={review.book.title} />
            </div>
            <div className="review-body">
                <h2 className="review">"<em>{review.book.title}</em>" by {review.book.author.name}</h2>
                <h5 className="review">{review.rating} stars</h5>
                <p className="review">{review.comment}</p>
                <small className="review">@{review.user.username}</small>
            </div>
        </div>
    );
}

export default ReviewCard;