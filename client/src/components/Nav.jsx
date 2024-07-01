import {React, useState} from 'react';
import {Link } from 'react-router-dom';
import logo from '../images/logoWithText.png'; 
import '../style/nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPaperclip} from '@fortawesome/free-solid-svg-icons';

function Nav() {
    const [isRegistered, setIsRegistered]=useState(true);
    const [userId, setUserId]=useState("3");
    return (
            <nav>
                <div className="logo">
                    <Link to="/home">
                        <img src={logo} alt="Logo" id='navLogo'/>
                    </Link>
                </div>
                <ul>
                    {!isRegistered&&<li><Link to="/SignIn">Sign In</Link></li>}
                    {/* {isRegistered&&<li><Link to="/SignIn">Logout</Link></li>} */}
                    <li><Link to="items/addItem">Add Item</Link></li>
                    {isRegistered&&<li><Link to={`/users/${userId}/wishList`}><FontAwesomeIcon icon={faHeart} className='icon' title="Wish List"/></Link></li>}
                    {isRegistered&&<li><Link to={`/users/${userId}/myProducts`}><FontAwesomeIcon icon={faPaperclip} className='icon' title="My Products"/></Link></li>}
                </ul>
            </nav>
    );
}

export default Nav;
