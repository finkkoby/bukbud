import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { useOutletContext } from "react-router-dom";

import * as yup from "yup";


function AddNewReview() {
    const { user, books } = useOutletContext();
    const initialState = {
        error: null,
        status: "pending",
      };
    const [{ error, status }, setState] = useState(initialState);
    const formSchema = yup.object().shape({
        book: yup.string().required("please select a book"),
        rating: yup.number().required("please select a rating").min(0).max(5),
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
            fetch('http://localhost:5555/api/add-new-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user,
                    book: values.book,
                    rating: values.rating,
                    comment: values.comment
                })
            })
           .then(r => {
                if (r.ok) {
                    r.json().then(res => {
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

    const bookOptions = books.map(book => <option key={book.id} value={book}>"{book.title}" by {book.author.name}</option>)

    return (
        <div>
            <h1>Add New Review</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="book">
                    book
                    <select
                    id="book"
                    value={formik.values.book}
                    onChange={formik.handleChange}
                    >
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
                    <input
                        type="text"
                        id="comment"
                        value={formik.values.comment}
                        onChange={formik.handleChange}
                    />
                </label>
                <button type="submit">submit</button>
                { error? <p>{error}</p> : null}
            </form>
        </div>
    );
}

export default AddNewReview;