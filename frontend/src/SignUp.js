import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {

        } catch (error) {

        }
    }

    const toggleSignIn = async (e) => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <div className="signup">
            <h2>Sign up for Academic Tracker</h2>
            <form onSubmit={handleSignUp}>

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

                <p onClick={toggleSignIn} style={{ cursor: 'pointer', color: '#007BFF', marginTop: '20px' }}>
                    Already have an account? Login here
                </p>

            </form>
        </div>
    );

};

export default SignUp;