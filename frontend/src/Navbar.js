import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return ( 
    <nav className="navbar">
    <h1>Academic Tracker</h1>
    <div className="links">
        <Link to="/addassignment">Assignment Tracker</Link>
        <Link to="/exams">Exam Tracker</Link>
        <Link to="/">Logout</Link>
    </div>
    </nav>
     );
}
 
export default Navbar;