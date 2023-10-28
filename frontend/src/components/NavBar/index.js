import { NavLink } from "react-router-dom";
import logo from "./nav_logo/logo.png"
import { useEffect, useState } from "react";

const NavBar = () => {

    const [sidebar, setSidebar] = useState(false)

    const toggle = () => {
        document.getElementById()
    }

    useEffect(() => {

    }, [])

    return (
        <div className="navbar bg-primary" style={{ position: "sticky", top: 0 }}>
            <div className="navbar-start">
                <input type="checkbox" id="drawer-left" className="drawer-toggle" />

                <label htmlFor="drawer-left" className="p-4">
                    <i className='fa-solid fa-bars' style={{ color: "black" }} />
                </label>
                <label className="overlay" htmlFor="drawer-left"></label>
                <div className="drawer">
                    <div className="drawer-content pt-10 flex flex-col h-full bg-secondary">
                        <label htmlFor="drawer-left" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-40">✕</label>
                        <div htmlFor="drawer-left">
                            <h2 className="text-xl font-medium">Menu</h2>
                            <div className="p-4"><label htmlFor="drawer-left" className="text-2xl btn btn-sm btn-circlze btn-ghost">ORDERING</label></div>
                            <div className="p-4"><label htmlFor="drawer-left" className="text-2xl btn btn-sm btn-circlze btn-ghost">SIZING</label></div>
                            <div className="p-4"><label htmlFor="drawer-left" className="text-2xl btn btn-sm btn-circlze btn-ghost">GALLERY</label></div>
                            <div className="p-4"><label htmlFor="drawer-left" className="text-2xl btn btn-sm btn-circlze btn-ghost">ABOUT</label></div>
                            <div className="p-4"><label htmlFor="drawer-left" className="text-2xl btn btn-sm btn-circlze btn-ghost">FAQ</label></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar-center">
                <NavLink className="navbar-item" exact to='/' style={{ width: "120px" }}>
                    <img src={logo} alt={logo} />
                </NavLink>
            </div>
            <div className="navbar-end">
                <a className="navbar-item">Order</a>
            </div>
        </div>
    )
}

export default NavBar
