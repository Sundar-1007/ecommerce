import { Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux';
import { logIn } from '../../Slices/UserDetailSlice';

const Login = () => {
    const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dispatch = useDispatch()
    return (
        <>
            <div className="container">
                <h1 className='text-center mt-5'>Login Form</h1>
                <Formik initialValues={{ userMail: "", userPassword: "" }}
                    validate={(values) => {
                        const errors = {};

                        // email validation

                        if (!values.userMail) {
                            errors.userMail = 'Required'
                        } else if (!validRegex.test(values.userMail)) {
                            errors.userMail = 'invalid email address'
                        }

                        // password validation
                        if (!values.userPassword) {
                            errors.userPassword = 'required'
                        } else if (values.userPassword.length < 6) {
                            errors.userPassword = "password must be above 6 line"
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log(values);
                        resetForm()
                        setSubmitting(false);
                        dispatch(logIn(values))
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        handleSubmit,
                        handleBlur,
                        handleChange
                    }) => (
                        <form onSubmit={handleSubmit} className='col-6 mx-auto'>
                            <div className="mb-3">
                                <label htmlFor="userMail" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="userMail"
                                    aria-describedby="userMail"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.userMail}
                                />
                                {errors.userMail && touched.userMail &&
                                    <p className='text-danger'>{errors.userMail}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userPassword" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="userPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.userPassword}
                                />
                                {errors.userPassword && touched.userPassword &&
                                    <p className='text-danger'>{errors.userPassword}</p>}
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default Login