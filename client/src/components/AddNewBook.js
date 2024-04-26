import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { useOutletContext } from "react-router-dom";

import * as yup from "yup";


function AddNewBook() {
    const { user, books, navigate, setBooks, authors } = useOutletContext();
    const initialState = {
        error: null,
        status: "pending",
      };
    const [{ error, status }, setState] = useState(initialState);
    const formSchema = yup.object().shape({
        title: yup.string().required("please enter a title"),
        author: yup.string().required("please select an author"),
        genre: yup.string().required("please select a genre"),
        length: yup.string().required("please enter a length"),
        image: yup.string().required("please enter an image url")
    })
    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            genre: '',
            length: '',
            image: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const requestBody = {
                title: values.title,
                author: values.author,
                genre: values.genre,
                length: values.length,
                image: values.image
            }
            fetch("/api/books", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
           .then(r => {
                if (r.ok) {
                    r.json().then(res => {
                        setBooks([...books, res])
                        setState({
                            error: null,
                            status: "success"
                        });
                        navigate('/books')
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

    const authorOptions = authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)

    const genres = ["Fiction", "Fantasy", "Science Fiction", "Mystery", "Romance", "Historical Fiction", "Non-Fiction", "Thriller", "Graphic Novel"]
    const genreOptions = genres.map(genre => <option key={genre} value={genre}>{genre}</option>)

    return (
        <>
            <h1 className='title-header'>add new <span className="special-text">book</span>...</h1>
            <div className="form-body" id="add-new-review">
                <form className='left-form' onSubmit={formik.handleSubmit}>
                    <div className="input-fields">
                        <label htmlFor="title">
                            title
                            <input
                            type="text"
                            id="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            />
                        </label>
                        <label htmlFor="author">
                            author
                            <select
                            id="author"
                            value={formik.values.author}
                            onChange={formik.handleChange}
                            >
                                <option value="">select an author</option>
                                {authorOptions}
                            </select>
                        </label>
                        <label htmlFor="genre">
                            genre
                            <select
                                id="genre"
                                value={formik.values.genre}
                                onChange={formik.handleChange}
                            >
                                <option value="">select a genre</option>
                                {genreOptions}
                            </select>
                        </label>
                        <label htmlFor="length">
                            length
                            <input
                                type="text"
                                id="length"
                                value={formik.values.length}
                                onChange={formik.handleChange}
                            />
                        </label>
                        <label htmlFor="image">
                            image
                            <input
                                type="text"
                                id="image"
                                value={formik.values.image}
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

export default AddNewBook;