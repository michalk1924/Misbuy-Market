import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/signInUp.css'
import {Token} from './TokenProvider';

function SignIn() {

  const navigate = useNavigate();

  const tokenContext = useContext(Token);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [worng, setWorng] = useState(false);
  const [token, setToken] = useState(tokenContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  };

  const saveSignIn = async (e) => {
    console.log(formData);
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/signin`, {
      // const response = await fetch(`http://localhost:3000/api/bags`, {
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
      const token = await response.json();
      setToken(token.token);
      console.log(token.token);
      localStorage.setItem("currentUser", formData.email);
      navigate(`/home`, { state: token });
    };
  }

  return (
    <div className="container">
      <form className='signInUpForm' onSubmit={saveSignIn}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name='email' onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name='password' onChange={handleChange} />
        <button className="submit-button">Sign In</button>
        <Link to="/signup" className="link">Don't have an account? Sign Up</Link>
      </form>
      {worng && <p>email or password aren't correct!</p>}
    </div>
  );

}

export default SignIn;
