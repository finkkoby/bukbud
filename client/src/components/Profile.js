import React from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { useFormik } from "formik";
import ReviewCard from "./ReviewCard";

import * as yup from "yup";

function Profile() {
    const { user, setUser, reviews } = useOutletContext()

    const [update, setUpdate] = useState(false)
    const [error, setError] = useState(null)

    const formSchema = yup.object().shape({
        username: yup.string().optional(),
        current: yup.string().required("please enter your current password"),
        new: yup.string().optional().oneOf([yup.ref('current'), null], "passwords must match"),
        age: yup.number().positive("please enter valid age").integer("please enter valid age").required("please enter your age")
    })

    const formik = useFormik(
        {
            initialValues: {
                username: user.username,
                current: '',
                new: '',
                age: user.age,
            },
            validationSchema: formSchema,
            validateOnChange: false,
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

    function handleDeleteUser() {
        fetch('/api/profile', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then(res => {
                    setUser(null)
                })
            }
        })
    }

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
                        { formik.errors.username ? <p className="error">{formik.errors.username}</p> : null }
                        <label htmlFor="current">
                            current password
                            <input
                                type="password"
                                id="current"
                                value={formik.values.current}
                                onChange={formik.handleChange}
                            />
                        </label>
                        { formik.errors.current ? <p className="error">{formik.errors.current}</p> : null }
                        <label htmlFor="new">
                            new password
                            <input
                            type="password"
                            id="new"
                            onChange={formik.handleChange}
                            value={formik.values.new}
                            />
                        </label>
                        { formik.errors.new ? <p className="error">{formik.errors.new}</p> : null }
                        <label htmlFor="age">
                            age
                            <input
                                type="number"
                                id="age"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                            />
                        </label>
                        { formik.errors.age ? <p className="error">{formik.errors.age}</p> : null }
                        { error? <p className="error">{error}</p> : null}
                    </div>
                    <button type="submit">update</button>
                </form>
                { update ? <p className="message">profile updated!</p> : null}
            </div>
            { myReviews.length > 0 ? reviewSection : <div className="bottom-text"><p>you haven't written any reviews yet :)</p></div> }
            <div>
                <button className="delete-account" onClick={handleDeleteUser}>delete my account :(</button>
            </div>
        </div>
    );
}

export default Profile;