import React from 'react';
import { Link } from 'react-router-dom'; 
import '../style/signInUp.css'

function SignIn() {
  return (
    <div className="container">
      <form className='signInUpForm'>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button className="submit-button">Sign In</button>
        <Link to="/signup" className="link">Don't have an account? Sign Up</Link>
      </form>
    </div>
  );
}

export default SignIn;
