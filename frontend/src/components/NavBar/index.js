import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from "./nav_logo/logo.png"
import { useOrderContext } from "../../context/OrderContext";

const NavBar = () => {

    const history = useHistory();
    const { scrollToOrder, scrollToAbout, scrollToGallery, scrollToFAQ } = useOrderContext()
    const [isScrolling, setIsScrolling] = useState(false);

    const scrollToSection = (element, offset) => {
        if (element.current && !isScrolling) {
            const navbarHeight = 140;
            const targetOffset = element.current.offsetTop - navbarHeight;
            setIsScrolling(true);
            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth',
            });
            setTimeout(() => {
                setIsScrolling(false);
                history.push(element === scrollToAbout ? "/about" : "/faq");
            }, 1000); // Adjust the delay time as needed
        }
    };

    return (
        <div className="navbar bg-primary" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
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
                            <div className="p-4">
                                <label
                                    htmlFor="drawer-left"
                                    className="text-2xl btn btn-sm btn-circlze btn-ghost"
                                    onClick={scrollToSection(scrollToAbout, 140)}
                                >
                                    ABOUT</label>
                            </div>
                            <div className="p-4">
                                <label
                                    htmlFor="drawer-left"
                                    className="text-2xl btn btn-sm btn-circlze btn-ghost"
                                    onClick={scrollToSection(scrollToOrder,150)}>
                                    ORDERING
                                </label>
                            </div>
                            <div className="p-4">
                                <label
                                    htmlFor="drawer-left"
                                    className="text-2xl btn btn-sm btn-circlze btn-ghost"
                                    onClick={scrollToSection(scrollToFAQ,200)}>
                                    FAQ
                                </label>
                            </div>
                            <div className="p-4">
                                <label
                                    htmlFor="drawer-left"
                                    className="text-2xl btn btn-sm btn-circlze btn-ghost"
                                    onClick={(e) => scrollToGallery.current.scrollIntoView({ behavior: 'smooth' })}>
                                    GALLERY
                                </label>
                            </div>
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
                <a href='/order' className="navbar-item">
                    <i className="fa-solid fa-bag-shopping" style={{ color: "black" }}></i>
                </a>
            </div>
        </div>
    )
}

export default NavBar
