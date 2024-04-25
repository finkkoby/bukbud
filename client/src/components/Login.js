import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useOutletContext } from 'react-router-dom';

const initialState = {
    user: null,
    error: null,
    status: "pending",
  };

function Login({ setSignup, setUser }) {
    const [{ user, error, status }, setState] = useState(initialState);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: (values) => {
            fetch('http://localhost:5555/api/login', {
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
                        console.log(res.session)
                        console.log(res.user)
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
                        <label htmlFor='password'>
                            password 
                            <input
                            type="text"
                            id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit">login</button>
                    { error ? <p>{error}</p> : null}
                </form>
                <p className="center">want to join the hive? <span className="special" onClick={() => setSignup(true)}>signup</span></p>
            </div>
        </>
    );
}

export default Login;