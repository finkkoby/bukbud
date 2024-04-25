import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { useOutletContext } from "react-router-dom";

import * as yup from "yup";


function AddNewReview() {
    const { user, books, navigate, reviews, setReviews } = useOutletContext();
    const initialState = {
        error: null,
        status: "pending",
      };
    const [{ error, status }, setState] = useState(initialState);
    const formSchema = yup.object().shape({
        book: yup.string().required("please select a book"),
        rating: yup.number().required("please select a rating").min(1).max(10),
        comment: yup.string().required("please enter a comment")
    })
    const formik = useFormik({
        initialValues: {
            book: '',
            rating: '',
            comment: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const requestBody = {
                book: values.book,
                rating: values.rating,
                comment: values.comment
            }
            fetch("/api/reviews", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
           .then(r => {
                console.log(r);
                if (r.ok) {
                    r.json().then(res => {
                        console.log(res)
                        setReviews([...reviews, res])
                        setState({
                            error: null,
                            status: "success"
                        });
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
                        <label htmlFor="rating">
                            rating
                            <input
                                type="text"
                                id="rating"
                                value={formik.values.rating}
                                onChange={formik.handleChange}
                            />
                        </label>
                        <label htmlFor="comment">
                            comment
                            <textarea
                                type="text-area"
                                id="comment"
                                value={formik.values.comment}
                                onChange={formik.handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit">submit</button>
                    { error? <p>{error}</p> : null}
                </form>
            </div>
        </>
    );
}

export default AddNewReview;