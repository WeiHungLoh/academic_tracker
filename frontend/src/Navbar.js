import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const currLocation = location.pathname;
    const navigate = useNavigate();

    const isAssignmentActive = (currentLocation) => {
        if (currentLocation === "/addassignment" || currentLocation === "/viewassignments") {
            return true;
        } 
        return false;
    }

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const isExamActive = (currentLocation) => {
        if (currentLocation === "/addexam" || currentLocation === "/viewexams") {
            return true;
        } 
        return false;
    }

    return ( 
    <nav className="navbar">
        <h1>Academic Tracker</h1>
        <nav className="links">
            <NavLink to="/addassignment" className={isAssignmentActive(currLocation) ? "active" : "inactive"}>
                Assignment Tracker
            </NavLink>

            <NavLink to="/addexam" className={isExamActive(currLocation) ? "active" : "inactive"}>
                Exam Tracker
            </NavLink>

            <NavLink to="/" className="inactive" onClick={handleSignOut} >Logout</NavLink>
        </nav>
    </nav>
     );
}
 
export default Navbar;