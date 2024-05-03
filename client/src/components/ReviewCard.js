import React from "react";
import { useState, useEffect } from "react";

import { useOutletContext } from "react-router-dom";

function ReviewCard({ review, boo=false }) {

    const { user, reviews, setReviews, setReviewBook, setReviewRating, 
            setReview, setReviewComment, navigate } = useOutletContext()

    function handleLike(e) {
        e.stopPropagation();
        fetch(`/api/reviews/${review.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                book: review.book.id,
                rating: review.rating,
                comment: review.comment,
                likes: review.likes + 1
            })
        }).then((response) => {
            if (response.ok) {
                response.json().then(res => {
                    setReviews(reviews.map((review) => {
                        if (review.id === res.id) {
                            return res
                        } else {
                            return review
                        }
                    }))
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
                        setReview(review)
                        navigate('/add-new-review')
                    }
                });
            }
        })
    }

    return (
        <div key={review.id} className="review-card" onClick={boo ? handleClick : null}>
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
                    <p>{review.likes} likes</p>
                    {boo ? <button className="delete-btn" onClick={handleDelete}>delete review</button> : null}
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;