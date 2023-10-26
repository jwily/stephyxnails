import { NavLink } from "react-router-dom";
import logo from "./nav_logo/logo.png"

const NavBar = () => {

    return (
        <div className="navbar bg-primary">
            <div className="navbar-start">
                <a className="navbar-item w-16">
                    <img src={logo} alt={logo} />
                </a>

            </div>
            <div className="navbar-end">
                <a className="navbar-item text-gray-500">ORDERING</a>
                <a className="navbar-item text-gray-500">SIZING</a>
                <a className="navbar-item text-gray-500">GALLERY</a>
                <a className="navbar-item text-gray-500">ABOUT</a>
                <a className="navbar-item text-gray-500">FAQ</a>
            </div>
        </div>
    )
}

export default NavBar
