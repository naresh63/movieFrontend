import React from 'react';
import {Link} from 'react-router-dom';
// navbar
const Header=()=>{
    return(
        <div className="header">
          <ul>
              <li> <Link to="/"> Home </Link> </li>
              <li> <Link to="/About"> About </Link> </li>
              <li> <Link to="/Contact"> Contact </Link> </li>
              <li> <Link to="/Adminpanel"> Adminpanel </Link> </li>

          </ul>
        </div>
    )
}

export default Header;