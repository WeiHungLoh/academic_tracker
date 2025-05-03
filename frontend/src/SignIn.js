import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault(); 
        try {

        } catch (error) {

        }
    }

    const toggleSignUp = async (e) => {
        e.preventDefault();
        navigate("/signup");
    }

    return (
        <div className="signin">
            <h2>Sign in to Academic Tracker</h2>
            <form onSubmit={handleSignIn}>

            <label>Email</label>
            <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                required
            />

            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />

            <button type="submit">Login</button>

            <p onClick={toggleSignUp} style={{ cursor: 'pointer', color: '#007BFF', marginTop: '20px' }}>
                Don’t have an account? Create one 
            </p>

            </form>
        </div>
    );
};

export default SignIn;