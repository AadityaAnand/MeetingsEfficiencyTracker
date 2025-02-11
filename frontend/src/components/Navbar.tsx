import { Link } from "react-router-dom";

const Navbar = () =>{
    return (
        <nav className="navbar">
            <div className="navbar-content container">
                <Link to ="/" className="nav-link"> Meetings Tracker</Link>
                <div className="nav-links">
                    <Link to ="/" className="nav-link">Dashboard</Link>
                    <Link to ="/meetings" className="nav-link"> Meetings</Link>
                    <Link to ="/add-meeting" className="nav-link">Add Meeting</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;