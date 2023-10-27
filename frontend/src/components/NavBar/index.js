import { NavLink } from "react-router-dom";
import logo from "./nav_logo/logo.png"

const NavBar = () => {

    return (
        <div className="navbar bg-primary">
            <div className="navbar-start">
                <a className="navbar-item" style={{width:"120px"}}>
                    <img src={logo} alt={logo} />
                </a>

            </div>
            <div className="navbar-end">
                <NavLink className="navbar-item text-gray-500" exact to='/order'>ORDERING</NavLink>
                <NavLink className="navbar-item text-gray-500" exact to='/sizing'>SIZING</NavLink>
                <NavLink className="navbar-item text-gray-500" exact to='/gallery'>GALLERY</NavLink>
                <NavLink className="navbar-item text-gray-500" exact to='/about'>ABOUT</NavLink>
                <NavLink className="navbar-item text-gray-500" exact to='/faq'>FAQ</NavLink>
            </div>
        </div>
    )
}

export default NavBar
