import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TokenContext } from './TokenProvider';
import { UserContext } from './UserProvider';

function NewPassword() {

    const { token, setToken } = useContext(TokenContext);
    const { userId, setUserId } = useContext(UserContext);

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleChangePassword = (e) => {
        const { value } = e.target;
        setPassword(value);
    };

    const handleChangeVerifyPassword = (e) => {
        const { value } = e.target;
        setVerifyPassword(value);
    };

    const savePassword = async (e) => {
        e.preventDefault();
        if (password != verifyPassword) {
            alert('Passwords do not match!');
            return;
        }
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
            alert('Failed to save password!')
        } else {
            const {token, user_Id} = await response.json();
            setToken(token);
            setUserId(user_Id);
            localStorage.setItem("currentUser", email);
            localStorage.setItem("token", token.token);
            navigate(`/home`, { state: token });
        }
    };

    return (
        <div className="container">
            <form onSubmit={savePassword}>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name='password' onChange={handleChangePassword} />

                <label htmlFor="verifyPassword">Verify Password</label>
                <input type="password" id="verifyPassword" name='verifyPassword' onChange={handleChangeVerifyPassword} />

                <button type="submit" className="submit-button">Save</button>
            </form>
        </div>
    );
}

export default NewPassword;
