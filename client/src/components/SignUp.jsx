import React from 'react';
import { Link } from 'react-router-dom'; 

function SignUp() {
  return (
    <div className="container">
      <form className='signInUpForm'>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button className="submit-button">Sign Up</button>
        <Link to="/signin" className="link">Already have an account? Sign In</Link>
      </form>
    </div>
  );
}

export default SignUp;
