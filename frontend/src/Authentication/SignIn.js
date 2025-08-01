import './SignIn.css'
import { MdEmail, MdLock } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { GoAlertFill } from 'react-icons/go'
import { HiAcademicCap } from 'react-icons/hi2'
import { IoEye } from 'react-icons/io5'
import { IoMdEyeOff } from 'react-icons/io'
import LoadingSpinner from '../Icons/LoadingSpinner.js'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [visible, setVisiblity] = useState(false)
    const [isPending, setIsPending] = useState(false)

    // Dummy fetch request to wake backend hosted on free tier
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/ping/ping`)
    }, [])

    const handleSignIn = async (e) => {
        e.preventDefault()
        setIsPending(true)
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signin`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                }
            )

            const data = await res.json()
            if (!res.ok) {
                alert('Failed to sign in: ' + data.message)
                setIsPending(false)
                return
            }
            setIsPending(false)

            // Save access token so we can use it for routes protected by access token
            navigate('/addassignment')
        } catch (error) {
            alert('Failed to sign in! ' + error.message)
        }
    }

    const toggleSignUp = async () => {
        navigate('/signup')
    }

    const showVisiblity = () => {
        return visible ? <IoEye /> : <IoMdEyeOff />
    }

    return (
        <div className='signin'>
            <HiAcademicCap className='logo-icon' />
            <h2>Sign in to Academic Tracker</h2>
            <form onSubmit={handleSignIn}>

                <label>Email</label>
                <div className='input-box'>
                    <MdEmail className='left-icon' />
                    <input
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <label>Password</label>
                <div className='password-wrapper'>
                    <MdLock className="left-icon" />
                    <input
                        type={visible ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <div className='toggle-visibility' onClick={() => setVisiblity(!visible)}>
                        {showVisiblity()}
                    </div>
                </div>

                {isPending
                    ? <button>Loading...{' '}<LoadingSpinner /> </button>
                    : <button type='submit'>Sign in</button>
                }

                <p onClick={toggleSignUp}>
                    Don’t have an account? Create one
                </p>
            </form>
            <div className='notice-wrapper'>
                <span className='alert-icon'>
                    <GoAlertFill />
                </span>
                {'  '}If the sign-in process seems to hang after you click the sign in button,
                please wait up to 30 seconds. This may happen because the backend is hosted on a free tier,
                which can take time to wake up after periods of inactivity.
            </div>
        </div>
    )
}

export default SignIn
