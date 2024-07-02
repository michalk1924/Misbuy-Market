import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/signInUp.css'
import { TokenContext } from './TokenProvider';
import { UserContext } from './UserProvider';

function SignIn() {

  const navigate = useNavigate();

  const { token, setToken } = useContext(TokenContext);
  const { userId, setUserId } = useContext(UserContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [worng, setWorng] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  };

  const saveSignIn = async (e) => {
    console.log(formData);
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "password": formData.password,
          "email": formData.email
        }
      )
    });
    console.log(response.status);
    if (response.status != 200) {
      setWorng(true);
    }
    else {
      const {user, token} = await response.json();
      setToken(token);
      setUserId(user._id);
      localStorage.setItem("currentUser", user._id);
      localStorage.setItem("token", token);
      navigate(`/home`, { state: token });
    };
  }

  const forgotPassword = async () => {
    const response = await fetch(`http://localhost:3000/forgotpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "email": formData.email
        }
      )
    });
    if (response.status != 200) {
      setWorng(true);
    }
    else {
      navigate(`/forgotpassword`, { state: { email: formData.email } });
    };
  }

  return (
    <div className="container">
      <form className='signInUpForm' onSubmit={saveSignIn}>

        <label htmlFor="email">Email</label>
        <input type="text" id="email" name='email' onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name='password' onChange={handleChange} />

        <button className="submit-button">Sign In</button>

        <a onClick={forgotPassword}>forgot your password?</a>
        
        <Link to="/signup" className="link">Don't have an account? Sign Up</Link>
      </form>
      {worng && <p>email or password aren't correct!</p>}
    </div>
  );

}

export default SignIn;
