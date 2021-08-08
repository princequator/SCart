import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'
import useForm from './useForm';
import validateInfo from './signUpValidator';
import axios from 'axios';
import './SignUp.css'

const api = axios.create({
    baseURL: 'http://localhost:5000/',
});

const SignUp = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submitForm = (data) => {
        const postData = {
            username: data.username,
            password: data.password,
            phoneNumber: Number(data.phoneNumber),
            emailId: data.email,
            userType: data.accType
        }

        api.post('/users/', postData).then((res) => {
            //console.log(res.status, res.statusText)
            if (res.status === 201) {
                setIsSubmitted(true);
            }
        }).catch(err => console.log(err));
    }

    const { handleChange, handleSubmit, values, errors } = useForm(submitForm, validateInfo);
    //id={Object.keys(errors).length > 0 ? "signupform" : "signupformSuccess"}
    return (
        <Fragment>
            {isSubmitted ? <SuccessForm /> :
                <div className='container mt-5 border border-success shadow p-3 mb-5 bg-white rounded' style={formStyles}>
                    <form onSubmit={handleSubmit} >
                        <div className='row mb-2'>
                            <label htmlFor="inputusername" className="form-label d-flex">Username</label>
                            <div className="form-group col">
                                <input type="text"
                                    className="form-control"
                                    id="inputusername"
                                    name='username'
                                    placeholder='kavya'
                                    value={values.username}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {errors.username && <p style={errorStyles}>{errors.username}</p>}
                        <div className='row mb-2'>
                            <label htmlFor="inputemail" className="form-label d-flex">Email Address</label>
                            <div className="form-group col">
                                <input type="email"
                                    className="form-control"
                                    id="inputemail"
                                    name='email'
                                    placeholder='kavya@abc.com'
                                    value={values.email}
                                    onChange={handleChange}

                                />
                            </div>
                        </div>
                        {errors.email && <p style={errorStyles}>{errors.email}</p>}
                        <div className='row mb-2'>
                            <label htmlFor="inputNumber" className="form-label d-flex">Phone Number</label>
                            <div className="form-group col">
                                <input type="number"
                                    className="form-control"
                                    id="inputNumber"
                                    name='phoneNumber'
                                    placeholder='9691836008'
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {errors.phoneNumber && <p style={errorStyles}>{errors.phoneNumber}</p>}
                        <div className='row mb-2'>
                            <div className="form-group col-sm-6">
                                <label htmlFor="inputPassword" className="form-label d-flex">Password</label>
                                <input type="password"
                                    className="form-control"
                                    id="inputPassword"
                                    name='password'
                                    placeholder='*******'
                                    value={values.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-sm-6">
                                <label htmlFor="inputConfirmPwd" className="form-label d-flex">Confirm Password</label>
                                <input type="password"
                                    className="form-control"
                                    id="inputConfirmPwd"
                                    name='confirmPassword'
                                    placeholder='*******'
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {errors.password && <p style={errorStyles}>{errors.password}</p>}
                        {/* <div className='row mb-3' >
                            <label className="form-label d-flex">Account Type</label>
                            <div className="form-group form-check form-check-inline col-sm-2" style={{ marginLeft: '1em' }}>
                                <input type="radio"
                                    className="form-check-input"
                                    id="inputBuyer"
                                    name='accType'
                                    value='buyer'
                                    onChange={handleChange}
                                />
                                <label htmlFor="inputBuyer" className="form-check-label">Buyer</label>
                            </div>
                            <div className="form-group form-check form-check-inline col-sm-2">
                                <input type="radio"
                                    className="form-check-input"
                                    id="inputSeller"
                                    name='accType'
                                    value='seller'
                                    onChange={handleChange}
                                />
                                <label htmlFor="inputSeller" className="form-check-label">Seller</label>
                            </div>
                        </div> */}

                        {errors.confirmPassword && <p style={errorStyles}>{errors.confirmPassword}</p>}
                        {errors.mandatory && <p style={errorStyles}>{errors.mandatory}</p>}
                        <button type="submit" className="btn btn-primary mt-2" >Register</button>
                        <hr>
                        </hr>
                        <Link to="/home"><small className='link'>Already have an account?</small></Link>
                    </form >
                </div >
            }
        </Fragment>
    )
}

const SuccessForm = () => {
    return (
        <div className='container mt-5' style={{ maxWidth: '400px' }}>
            <div className="row">
                <div className="card bg-success" style={{ color: 'white', padding: '10px' }}>
                    <h2>User has been registered successfully!</h2>
                    <div className="card-body" >
                        <Link to="/login" className="btn btn-primary mt-2" >Go to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;

const formStyles = {
    maxWidth: '550px',
    backgroundColor: 'lightblue',
    padding: '20px',
    borderRadius: '10px',

}

const errorStyles = {
    fontSize: "0.7rem",
    fontWeight: 'bold',
    marginTop: "0.5rem",
    color: '#f00e0e',
}

const errorBorderStyles = {
    borderRadius: '5px',
    borderColor: 'red',
    borderLeftWidth: 'thick',
}

const validBorderStyles = {
    borderRadius: '5px',
    borderColor: 'green',
    borderLeftWidth: 'thick',
}
