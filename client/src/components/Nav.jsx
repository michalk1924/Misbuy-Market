import { React, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logoWithText.png';
import '../style/nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from './UserProvider';
function Nav() {
    
    const { userId } = useContext(UserContext);

    return (
        <nav>
            <div className="logo">
                <Link to="/home">
                    <img src={logo} alt="Logo" id='navLogo' />
                </Link>
            </div>
            <ul>
                {!userId && <li><Link to="/SignIn">Sign In</Link></li>}
                {!userId && <li><Link to="/SignUp">Sign Up</Link></li>}
                <li><Link to={userId && "items/addItem"} onClick={() => { !userId && alert("You have to sign in") }}>Add Item</Link></li>
                {userId && <li><Link to={`/users/${userId}/wishList`}><FontAwesomeIcon icon={faHeart} className='icon' title="Wish List" /></Link></li>}
                {userId && <li><Link to={`/users/${userId}/myProducts`}><FontAwesomeIcon icon={faPaperclip} className='icon' title="My Products" /></Link></li>}
            </ul>
        </nav>
    );
}

export default Nav;
