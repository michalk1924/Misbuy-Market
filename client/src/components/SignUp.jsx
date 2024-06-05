import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/signInUp.css'
import { Token } from './UserContext';

function SignUp() {

  const navigate = useNavigate();

  const tokenContext = useContext(Token);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [worng, setWorng] = useState(false);
  const [worngExists, setWorngExists] = useState(false);
  const [token, setToken] = useState(tokenContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  };

  const saveSignUp = async (e) => {
    console.log(formData);
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/signup`, {
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
      if (response.status == 409) { setWorngExists(true); setWorng(false); }
      else { setWorng(true); setWorngExists(false); }
    }
    else {
      const token = await response.json();
      setToken(token);
      console.log(token);
      localStorage.setItem("currentUser", formData.email);
      navigate(`/home`, { state: token });
    };
  }

  return (
    <div className="container">
      <form className='signInUpForm' onSubmit={saveSignUp}>
        <label htmlFor="email">Username</label>
        <input type="text" id="email" name='email' onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name='password' onChange={handleChange} />
        <button className="submit-button">Sign Up</button>
        <Link to="/signin" className="link">Already have an account? Sign In</Link>
      </form>
      {worngExists && <p>user already exists</p>}
      {worng && <p>worng</p>}
    </div>
  );
}

export default SignUp;
