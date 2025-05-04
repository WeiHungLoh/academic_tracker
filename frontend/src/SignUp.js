import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/auth/signup", 
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
                }
            );

            const message = await res.text();

            if (!res.ok) {
                alert("Failed to sign up: " + message);
                return;
            }

            alert("Successfully signed up! Redirecting you to login page");
            setTimeout(() => {
                navigate("/");
              }, 1000);
        } catch (error) {
            alert("Failed to signed up. " + error.message);
        }
    }

    const toggleSignIn = async (e) => {
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

                <button type="submit">Sign up</button>

                <p onClick={toggleSignIn}>
                    Already have an account? Login here
                </p>

            </form>
        </div>
    );

};

export default SignUp;