import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Home = ({ toggle, setToggle }) => {

    const history = useHistory();
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted: ", data);
        sessionStorage.setItem("auth", "true");
        setToggle(!toggle);
        history.push("/myorders")
    }

    return (
        <div className='container mt-5 border border-success shadow p-3 mb-5 bg-white rounded' style={{ maxWidth: "300px" }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    {/* <label for="exampleInputEmail1">Email address</label> */}
                    <input name="email" value={data.email} onChange={handleChange} type="email" placeholder='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group mt-2">
                    {/* <label for="exampleInputPassword1">Password</label> */}
                    <input name="password" placeholder='password' value={data.password} onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" required />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button type="submit" className="btn btn-primary mt-2">Login</button>
                    <hr></hr>
                    <Link to="/signup"><small>Don't have an account?</small></Link>
                </div>
            </form>
        </div >
    )
}

export default Home
