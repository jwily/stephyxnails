import { NavLink } from "react-router-dom";
import logo from "./nav_logo/logo.png"

const NavBar = () => {

    return (
        <div className="navbar">
            <div className="navbar-start">
                <a className="navbar-item">
                    <img src={logo} alt={logo} />
                </a>

            </div>
            <div className="navbar-end">
                <a className="navbar-item">ORDERING</a>
                <a className="navbar-item">SIZING</a>
                <a className="navbar-item">GALLERY</a>
                <a className="navbar-item">ABOUT</a>
                <a className="navbar-item">FAQ</a>
            </div>
        </div>
    )
}

export default NavBar
