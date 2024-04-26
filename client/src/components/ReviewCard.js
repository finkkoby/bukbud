import React from "react";
import { useState } from "react";

function ReviewCard({ review }) {

    const [likes, setLikes] = useState(review.likes)

    function handleLike(e) {
        fetch(`/api/reviews/${review.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                likes: likes + 1
            })
        }).then((response) => {
            if (response.ok) {
                response.json().then(res => {
                    setLikes(likes + 1)
                })
            } else {
                response.json().then(res => {
                    console.log(res.error)
                })
            }
        })
    }

    return (
        <div key={review.id} className="review-card">
            <div className="book-image">
                <img src={review.book.image} alt={review.book.title} />
            </div>
            <div className="review-body">
                <h2 className="review">"<em>{review.book.title}</em>" by {review.book.author.name}</h2>
                <h5 className="review">{"⭐️".repeat(review.rating)} ({review.rating} stars)</h5>
                <p className="review">{review.comment}</p>
                <small className="review">@{review.user.username}</small>
                <div className="likes">
                    <button className="like-btn" onClick={handleLike}>💛</button>
                    <p>{likes} likes</p>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;