import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';


const NavBar = ({ toggle, setToggle }) => {

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const authStatus = sessionStorage.getItem('auth');
        if (authStatus) {
            setIsAuth(true);
        }
    }, [toggle]);

    const logout = () => {
        sessionStorage.clear();
        setIsAuth(false);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ position: '-webkit-sticky' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand">SCart</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-item nav-link ">Home</Link>
                            <Link to="/signup" className="nav-item nav-link" >SignUP</Link>
                            <div hidden={!isAuth} className="navbar-nav">
                                <Link to="/myorders" className="nav-item nav-link " >MyOrder</Link>
                                <Link to="/" onClick={logout} className="nav-item nav-link " >Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;
