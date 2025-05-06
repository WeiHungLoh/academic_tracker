import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signin`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                }
            );
            
            const data = await res.json();
            if (!res.ok) {
                alert("Failed to sign in: " + data.message);
                return;
            }

            // Save access token so we can use it for routes protected by access token
            localStorage.setItem("token", data.token);
            navigate("/addassignment");
        } catch (error) {
            alert("Failed to sign in! " + error.message);
        }
    }

    const toggleSignUp = async (e) => {
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
                <p onClick={toggleSignUp}>
                    Don’t have an account? Create one
                </p>

            </form>
        </div>
    );
};

export default SignIn;