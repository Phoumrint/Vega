import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = () => {
   return(
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
                <li className='nav-item'>
                    <NavLink className="nav-link" activeClassName='activeNavLink' to="/">List Vehicles</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className="nav-link" activeClassName='activeNavLink' to="/vehicles/new">New Vehicle</NavLink>
                </li>
            </ul>
        </nav>
        <div className='mb-4' />
    </div>
    );
}

export default Navigation;
