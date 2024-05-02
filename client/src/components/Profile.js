import React from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { useFormik } from "formik";
import ReviewCard from "./ReviewCard";

function Profile() {
    const { user, setUser, reviews } = useOutletContext()

    const [update, setUpdate] = useState(false)
    const [error, setError] = useState(null)

    const formik = useFormik(
        {
            initialValues: {
                username: user.username,
                current: '',
                new: '',
                age: user.age,
            },
            onSubmit: (values) => {
                fetch('/api/profile', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: values.username,
                        password: values.current,
                        confirm_password: values.new,
                        age: values.age
                    })
                }).then((response) => {
                    if (response.ok) {
                        response.json().then(res => {
                            setUser(res)
                            setUpdate(true)
                        })
                    } else {
                        response.json().then(res => {
                            setError(res.error)
                        })
                    }
                })
            }
        }
    )

    const myReviews = reviews.filter(review => review.user.username === user.username)

    const reviewCards = myReviews.map(review => <ReviewCard key={review.id} review={review} boo={true}/>)

    const reviewSection = (
        <>
            <h1 className="title-header">my <span className="special-text">reviews</span>...</h1>
            <div className="review-cards">
                {reviewCards}
            </div>
        </>
    )

    return (
        <div>
            <h1 className="title-header">my <span className="special-text">profile</span>...</h1>
            <div className="form-body">
                <form className="left-form" onSubmit={formik.handleSubmit}>
                    <div className="input-fields">
                        <label htmlFor="username">
                            username
                            <input
                                type="text"
                                id="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                            />
                        </label>
                        <label htmlFor="current">
                            current password
                            <input
                                type="password"
                                id="current"
                                value={formik.values.current}
                                onChange={formik.handleChange}
                            />
                        </label>
                        <label htmlFor="new">
                            new password
                            <input
                            type="password"
                            id="new"
                            onChange={formik.handleChange}
                            value={formik.values.new}
                            />
                        </label>
                        <label htmlFor="age">
                            age
                            <input
                                type="text"
                                id="age"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit">update</button>
                    { update ? <div className="bottom-text"><p>profile updated!</p></div> : null}
                    { error? <div className="bottom-text"><p>{error}</p></div> : null}
                </form>
            </div>
            { myReviews.length > 0 ? reviewSection : <div className="bottom-text"><p>you haven't written any reviews yet :)</p></div> }
        </div>
    );
}

export default Profile;