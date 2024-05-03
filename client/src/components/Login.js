import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useOutletContext } from 'react-router-dom';

import * as yup from "yup"

const initialState = {
    user: null,
    error: null,
    status: "pending",
  };

function Login({ setSignup, setUser }) {
    const [{ user, error, status }, setState] = useState(initialState);

    const formSchema = yup.object().shape({
        username: yup.string().required("please enter a username"),
        password: yup.string().required("please enter a password")
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: (values) => {
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password
                })
            })
            .then(r => {
                if (r.ok) {
                    r.json().then(res => {
                        setUser(res);
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
    });

    return (
        <>
            <h3 className='login-header'>see what we're <span className='special-text'>buzzing</span> about...</h3>
            <div className="form-body">
                <form className="right-form" onSubmit={formik.handleSubmit}>
                    <div className='input-fields'>
                        <label htmlFor='username'>
                            username
                            <input
                            type="text"
                            id="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            />
                        </label>
                        { formik.errors.username ? <p className="error">{formik.errors.username}</p> : null }
                        <label htmlFor='password'>
                            password 
                            <input
                            type="password"
                            id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            />
                        </label>
                        { formik.errors.password ? <p className="error">{formik.errors.password}</p> : null }
                        { error && (!formik.errors.username && !formik.errors.password) ? <p className="error">invalid username or password</p> : null}
                    </div>
                    <button type="submit">login</button>
                </form>
                <p className="center">want to join the hive? <span className="special" onClick={() => setSignup(true)}>signup</span></p>
            </div>
        </>
    );
}

export default Login;