import React from "react";
import { useOutletContext } from "react-router-dom";

import { useFormik } from "formik";

function Profile() {
    const { user } = useOutletContext()

    const formik = useFormik(
        {
            initialValues: {
                username: user.username,
                current: '',
                new: '',
                age: user.age,
            },
            onSubmit: (values) => {
                console.log(values);
            }
        }
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
                                type="text"
                                id="current"
                                value={formik.values.current}
                                onChange={formik.handleChange}
                            />
                        </label>
                        <label htmlFor="new">
                            new password
                            <input
                            type="text"
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
                </form>
            </div>
        </div>
    );
}

export default Profile;