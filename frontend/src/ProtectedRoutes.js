import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoadingSpinner from './Icons/LoadingSpinner.js'

const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    const checkIsAuth = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/check`, {
                credentials: 'include',
            })

            if (res.ok) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
        } catch (error) {
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        checkIsAuth()
    }, [])

    // Wait for auth check to complete before rendering
    // Without this, component renders with default false state
    // and immediately redirects to login before API call finishes
    if (isAuthenticated === undefined) {
        return <div
            style={{
                textAlign: 'center',
                marginTop: '50px',
                fontSize: '24px'
            }}>
                Checking authentication status...
                <LoadingSpinner style={{height: '36px', width: '36px'}}/>
        </div>
    }
    return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoutes
