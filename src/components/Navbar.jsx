import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = React.memo((props)=> {
    console.log("Navbar");


    return (
      <>
        <nav className="navbar navbar-expand-lg bg-light fixed-top">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">News-App</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/business">business</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/entertainment">entertainment</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/health">health</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/science">science</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/sports">sports</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/technology">technology</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      </>
    )
})

export default Navbar
