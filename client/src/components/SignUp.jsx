import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/signInUp.css'
import { Token } from './UserContext';

function SignUp() {

  const navigate = useNavigate();

  const tokenContext = useContext(Token);

  const [formData, setFormData] = useState({});
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
      body: JSON.stringify(formData)
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
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name='name' onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="text" id="email" name='email' onChange={handleChange} />

        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" name='phone' onChange={handleChange} />

        <label htmlFor="area">Area</label>
        <select id="area" name="area" onChange={handleChange}>
          <option value="jerusalem">jerusalem</option>
          <option value="TLV">TLV</option>
          <option value="Elad">Elad</option>
        </select>

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name='password' onChange={handleChange} />

        <label htmlFor="verifyPassword">Verify Password</label>
        <input type="password" id="verifyPassword" name='verifyPassword' onChange={handleChange} />

        <button className="submit-button">Sign Up</button>
        <Link to="/signin" className="link">Already have an account? Sign In</Link>
      </form>
      {worngExists && <p>user already exists</p>}
      {worng && <p>worng</p>}
    </div>
  );
}

export default SignUp;
