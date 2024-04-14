import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login as loginUser } from '../store/actions/user.actions'; // Renamed for clarity

export function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser);

    useEffect(() => {
        if (loggedInUser) navigate('/');
    }, loggedInUser)

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await loginUser({ username, password })
            console.log(`Logging in user: 
                        Username: ${username}, 
                        Password: ${password}`);
            navigate('/')
        } catch (err) {
            console.log('Login failed:', err);
        }
    }

    const handleRegisterClick = () => {
        navigate('/register')
    };

    return (
        <div className="shared-section">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        minLength="3"
                        maxLength="8"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        minLength="3"
                        maxLength="8"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="secondary-button" type="button" onClick={handleRegisterClick}>Not a member? Register</button>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}
