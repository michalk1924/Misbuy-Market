import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function NewPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [password, setPassword] = useState('');
    const [wrong, setWrong] = useState(false);
    const [token, setToken] = useState();

    const handleChange = (e) => {
        const { value } = e.target;
        setPassword(value);
    };

    const savePassword = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/newpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        });

        if (response.status !== 200) {
            setWrong(true);
        } else {
            const token = await response.json();
            setToken(token.token);
            console.log(token.token);
            localStorage.setItem("currentUser", email);
            localStorage.setItem("token", token.token);
            navigate(`/home`, { state: token });
        }
    };

    return (
        <div className="container">
            <form onSubmit={savePassword}>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name='password' onChange={handleChange} />

                <label htmlFor="verifyPassword">Verify Password</label>
                <input type="password" id="verifyPassword" name='verifyPassword' onChange={handleChange} />

                <button type="submit" className="submit-button">Save</button>
            </form>
            {wrong && <p>Failed to save password!</p>}
        </div>
    );
}

export default NewPassword;
