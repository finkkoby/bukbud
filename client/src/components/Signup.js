import React from "react";
import { useFormik } from "formik";
import { useState } from "react";

const initialState = {
    user: null,
    error: null,
    status: "pending",
  };

function Signup({ setSignup, setUser }) {
    const [{ user, error, status }, setState] = useState(initialState);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirm: '',
            age: '',
        },
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
                        <label htmlFor="password">
                            password 
                            <input
                                type="text"
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                        </label>
                        <label htmlFor="confirm">
                            confirm password 
                            <input
                                type="text"
                                id="confirm"
                                onChange={formik.handleChange}
                                value={formik.values.confirm}
                            />
                        </label>
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
                    </div>
                    <button type="submit">signup</button>
                    { error ? <p>{error}</p> : null}
                </form>
                <p className="center">already in the hive? <span className="special" onClick={() => setSignup(false)}>login</span></p> 
            </div>
        </>
    );
}

export default Signup;