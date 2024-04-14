import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signup } from '../store/actions/user.actions';

export function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser) navigate('/');
    }, loggedInUser)

    const handleRegister = (event) => {
        event.preventDefault();
        signup({ username, password, fullname });
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="shared-section">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="fullname">Full-Name</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        required
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="secondary-button" type="button" onClick={handleLoginClick}>Member? Go login</button>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
