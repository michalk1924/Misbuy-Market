import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [code, setCode] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setCode(value);
    };

    const checkCode = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/checkcode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "code": code,
                "email": email
            })
        });

        if (response.status !== 200) {
            alert('Password reset code is incorrect!')
        } else {
            navigate(`/newpassword`, { state: { email: email } });
        }
    };

    return (
        <div className="container">
            <form onSubmit={checkCode}>
                <h4>enter the code you get in your email</h4>
                <label htmlFor="code">Code</label>
                <input type="text" id="code" name="code" value={code} onChange={handleChange} />
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default ForgotPassword;
