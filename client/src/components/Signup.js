import React from "react";
import { useFormik } from "formik";
import { useState } from "react";

import * as yup from "yup";

const initialState = {
    user: null,
    error: null,
    status: "pending",
  };

function Signup({ setSignup, setUser }) {
    const [{ user, error, status }, setState] = useState(initialState);

    const formSchema = yup.object().shape({
        username: yup.string().required("please enter a username"),
        password: yup.string().required("please enter a password"),
        confirm: yup.string().oneOf([yup.ref('password'), null], "passwords must match").required("please confirm your password"),
        age: yup.number().positive("please enter valid age").integer("please enter valid age").required("please enter your age")
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirm: '',
            age: '',
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: (values) => {
            fetch('http://localhost:5555/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password,
                    confirm_password: values.confirm,
                    age: values.age
                })
            })
           .then(r => {
                if (r.ok) {
                    r.json().then(res => {
                        setUser(res)
                        setState({
                            user: res.username,
                            error: null,
                            status: "success"
                        });
                    });
                }
                else {
                    r.json().then(res => {
                        setState({
                            user: null,
                            error: res.error,
                            status: "error"
                        });
                    });
                }
            })
        }
    })

    console.log(error)

    return (
        <>
            <h3 className='login-header'>see what we're <span className='special-text'>buzzing</span> about...</h3>
            <div className="form-body">
                <form className="right-form" onSubmit={formik.handleSubmit}>
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
                        <label htmlFor="password">
                            password 
                            <input
                                type="password"
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                        </label>
                        { formik.errors.password ? <p className="error">{formik.errors.password}</p> : null }
                        <label htmlFor="confirm">
                            confirm password 
                            <input
                                type="password"
                                id="confirm"
                                onChange={formik.handleChange}
                                value={formik.values.confirm}
                            />
                        </label>
                        { formik.errors.confirm ? <p className="error">{formik.errors.confirm}</p> : null }
                        <label htmlFor="age">
                            age
                            <input
                                type="text"
                                id="age"
                                placeholder="optional"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                            />
                        </label>
                        { formik.errors.age ? <p className="error">please enter valid age</p> : null }
                        { error ? <p className="error">{error}</p> : null}
                    </div>
                    <button type="submit">signup</button>
                </form>
                <p className="center">already in the hive? <span className="special" onClick={() => setSignup(false)}>login</span></p> 
            </div>
        </>
    );
}

export default Signup;