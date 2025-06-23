import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()
    const currLocation = location.pathname
    const navigate = useNavigate()

    const isAddAssignmentActive = (currentLocation) => {
        if (currentLocation === '/addassignment') {
            return true
        }
        return false
    }

    const isViewAssignmentActive = (currentLocation) => {
        if (currentLocation === '/viewassignments') {
            return true
        }
        return false
    }

    const handleSignOut = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    const isAddExamActive = (currentLocation) => {
        if (currentLocation === '/addexam') {
            return true
        }
        return false
    }

    const isViewExamActive = (currentLocation) => {
        if (currentLocation === '/viewexams') {
            return true
        }
        return false
    }

    return (
        <nav className='navbar'>
            <h1>Academic Tracker</h1>
            <nav className='links'>
                <NavLink to='/addassignment' className={isAddAssignmentActive(currLocation) ? 'active' : 'inactive'}>
                    Add Assignment
                </NavLink>

                <NavLink to='/viewassignments' className={isViewAssignmentActive(currLocation) ? 'active' : 'inactive'}>
                    View Assignments
                </NavLink>

                <NavLink to='/addexam' className={isAddExamActive(currLocation) ? 'active' : 'inactive'}>
                    Add Exam
                </NavLink>

                <NavLink to='/viewexams' className={isViewExamActive(currLocation) ? 'active' : 'inactive'}>
                    View Exams
                </NavLink>

                <NavLink to='/' className='inactive' onClick={handleSignOut} >Logout</NavLink>
            </nav>
        </nav>
    )
}

export default Navbar
