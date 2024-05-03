import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useOutletContext } from "react-router-dom";

import * as yup from "yup";


function AddNewReview() {
    const { user, books, navigate, reviews, 
        setReviews, reviewBook, setReviewBook, reviewRating, 
        setReviewRating, reviewComment, setReviewComment,
        review, setReview } = useOutletContext();
    
    const initialState = {
        error: null,
        status: "pending",
      };
    
    useEffect(() => {
        return function reset() {
            setReviewBook(null)
            setReviewRating(null)
            setReviewComment(null)
            setReview(null)
        }
    }, [])
    
    const [{ error, status }, setState] = useState(initialState);
    const formSchema = yup.object().shape({
        book: yup.string().required("please select a book"),
        rating: yup.number("rating must be a number").required("please select a rating").min(1).max(10),
        comment: yup.string().required("please enter a comment")
    })
    const formik = useFormik({
        initialValues: {
            book: reviewBook ? reviewBook.id : '',
            rating: reviewRating ? reviewRating : '',
            comment: reviewComment ? reviewComment : ''
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: (values) => {
            fetch("/api/reviews", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json',
                },
                body: JSON.stringify({
                    book: values.book,
                    rating: values.rating,
                    comment: values.comment
                })
            })
           .then(r => {
                console.log(r);
                if (r.ok) {
                    r.json().then(res => {
                        console.log(res)
                        setReviews([res, ...reviews])
                        setState({
                            error: null,
                            status: "success"
                        });
                        navigate('/')
                    });
                }
                else {
                    r.json().then(res => {
                        setState({
                            error: res.error,
                            status: "error"
                        });
                    });
                }
            })
        }
    })

    function handleUpdate() {
        fetch(`/api/reviews/${review.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
            },
            body: JSON.stringify({
                book: formik.values.book,
                rating: formik.values.rating,
                comment: formik.values.comment,
                likes: review.likes
            })}).then(res => {
                if (res.ok) {
                    res.json().then(res => {
                        reviews.map(review => {
                            if (review.id === res.id) {
                                return res
                            } else {
                                return review
                            }
                        })
                        setState({
                            error: null,
                            status: "success"
                        });
                        setReviewBook(null)
                        setReviewRating(null)
                        setReviewComment(null)
                        setReview(null)
                        navigate('/')
                    });
                }
                else {
                    res.json().then(res => {
                        setState({
                            error: res.error,
                            status: "error"
                        });
                    });
                }
            })
    }   
    
    const bookOptions = books.map(book => <option key={book.id} value={book.id}>"{book.title}" by {book.author.name}</option>)
    return (
        <>
            <h1 className='title-header'>add new <span className="special-text">review</span></h1>
            <div className="form-body new-form" id="add-new-review">
                <form className='left-form' onSubmit={formik.handleSubmit}>
                    <div className="input-fields">
                        <label htmlFor="book">
                            book
                            <select
                            id="book"
                            value={formik.values.book}
                            onChange={formik.handleChange}
                            >
                                <option value="">select a book</option>
                                {bookOptions}
                            </select>
                        </label>
                        { formik.errors.book ? <p className='error'>{formik.errors.book}</p> : null}
                        <label htmlFor="rating">
                            rating
                            <input
                                type="number"
                                id="rating"
                                value={formik.values.rating}
                                onChange={formik.handleChange}
                            />
                        </label>
                        { formik.errors.rating ? <p className='error'>{formik.errors.rating}</p> : null}
                        <label htmlFor="comment">
                            comment
                            <textarea
                                type="text-area"
                                id="comment"
                                value={formik.values.comment}
                                onChange={formik.handleChange}
                            />
                        </label>
                        { formik.errors.comment ? <p className='error'>{formik.errors.comment}</p> : null}
                    </div>
                    { review ? 
                    <button onClick={handleUpdate} type="button">update</button> :
                    <button type="submit" >submit</button>
                    }
                    
                </form>
            </div>
        </>
    );
}

export default AddNewReview;