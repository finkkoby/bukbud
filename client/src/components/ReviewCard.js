import React from "react";
import { useState } from "react";

import { useOutletContext } from "react-router-dom";

function ReviewCard({ review, boo=false }) {

    const { user, reviews, setReviews, setReviewBook, setReviewRating, setReviewComment, navigate } = useOutletContext()

    const [likes, setLikes] = useState(review.likes)

    function handleLike(e) {
        e.stopPropagation();
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

    function handleDelete(e) {
        e.stopPropagation();
        fetch(`/api/reviews/${review.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                setReviews(reviews.filter(r => r.id !== review.id))
            } else {
                response.json().then(res => {
                    console.log(res.error)
                })
            }
        })
    }

    function handleClick(e) {
        fetch('/api/check-session')
        .then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    if (user.id === review.user.id) {
                        setReviewBook(review.book)
                        setReviewRating(review.rating)
                        setReviewComment(review.comment)
                        navigate('/add-new-review')
                    }
                });
            }
        })
    }

    return (
        <div key={review.id} className="review-card" onClick={handleClick}>
            <button></button>
            <div className="book-image">
                <img src={review.book.image} alt={review.book.title} />
            </div>
            <div className="review-body">
                <div className="review-info">
                    <h2 className="review">"<em>{review.book.title}</em>" by {review.book.author.name}</h2>
                    <h5 className="review">{"⭐️".repeat(review.rating)} ({review.rating} stars)</h5>
                    <p className="review">{review.comment}</p>
                    <small className="review">@{review.user.username}</small>
                </div>
                <div className="likes">
                    <button className="like-btn" onClick={handleLike}>💛</button>
                    <p>{likes} likes</p>
                    {boo ? <button className="delete-btn" onClick={handleDelete}>delete review</button> : null}
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;