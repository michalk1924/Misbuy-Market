import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/signInUp.css'
import { TokenContext } from './TokenProvider';
import { UserContext } from './UserProvider';

function SignUp() {

  const navigate = useNavigate();

  const { token, setToken } = useContext(TokenContext);
  const { userId, setUserId } = useContext(UserContext);

  const [formData, setFormData] = useState({});
  const [worng, setWorng] = useState(false);
  const [worngExists, setWorngExists] = useState(false);

  const areas = ["Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beer Sheva", "Holon", "Bnei Brak", "Bat Yam", "Ramat Gan", "Ashkelon", "Herzliya", "Kfar Saba", "Modiin", "Nahariya", "Beit Shemesh", "Nazareth", "Tiberias", "Eilat", "Acre", "Lod", "Ra'anana", "Hadera", "Kiryat Gat", "Betar Illit", "Hod HaSharon", "Rosh HaAyin", "Qiryat Ata"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  };

  const saveSignUp = async (e) => {
    e.preventDefault();
    if(formData.password != formData.verifyPassword) {
      alert('the verify password is different from the password');
      return false;
    }
    const response = await fetch(`http://localhost:3000/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.status != 200) {
      if (response.status == 409) { alert("user already exists"); }
      else { alert("worng"); }
    }
    else {
      const {userId, token} = await response.json();
      setToken(token);
      setUserId(userId);
      localStorage.setItem("currentUser", userId);
      localStorage.setItem("token", token.token);
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
          {areas.map(area => 
          <option value={area}>{area}</option>)}
        </select>

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name='password' onChange={handleChange} />

        <label htmlFor="verifyPassword">Verify Password</label>
        <input type="password" id="verifyPassword" name='verifyPassword' onChange={handleChange} />

        <button className="submit-button">Sign Up</button>
        <Link to="/signin" className="link">Already have an account? Sign In</Link>
      </form>
    </div>
  );
}

export default SignUp;
