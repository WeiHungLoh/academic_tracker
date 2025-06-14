import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notification from '../Notification.js'
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'
import { GoAlertFill } from 'react-icons/go'
import LoadingSpinner from '../LoadingSpinner.js'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [notification, setNotification] = useState(null)
    const [visible, setVisiblity] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault()
        setIsPending(true)
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                }
            )

            const message = await res.text()

            if (!res.ok) {
                alert('Failed to sign up: ' + message)
                setIsPending(false)
                return
            }

            setNotification('Sign up succesful! Redirecting you to login page')
            setTimeout(() => {
                setNotification(null)
                navigate('/')
            }, 1500)
            setIsPending(false)
        } catch (error) {
            alert('Failed to signed up. ' + error.message)
        }
    }

    const toggleSignIn = async () => {
        navigate('/')
    }

    const showVisiblity = () => {
        return visible ? <IoEye /> : <IoMdEyeOff />
    }

    return (
        <div className='signup'>
            <h2>Sign up for Academic Tracker</h2>
            <form onSubmit={handleSignUp}>

                <label>Email</label>
                <input
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <div className='password-wrapper'>
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
                    ?   <button>Loading...{' '}<LoadingSpinner /> </button>
                    :   <button type='submit'>Sign up</button>
                }

                <p onClick={toggleSignIn}>
                    Already have an account? Login here
                </p>
            </form>

            <div className='notice-wrapper'>
                <span className='alert-icon'>
                    <GoAlertFill />
                </span>
                {'  '}If the sign-up process seems to hang after you click the sign up button,
                please wait up to 30 seconds. This may happen because the backend is hosted on a free tier,
                which can take time to wake up after periods of inactivity.
            </div>

            <Notification message={notification} />
        </div>
    )

}

export default SignUp
