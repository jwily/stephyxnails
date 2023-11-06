import React, { useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import logo from "./nav_logo/logo.png"
import { useOrderContext } from "../../context/OrderContext";

const NavBar = () => {

    const history = useHistory();
    const { scrollToOrder, scrollToAbout, scrollToGallery, scrollToFAQ } = useOrderContext()
    const { pathname } = useLocation()

    const scrollToSection = (scrollTo) => {
        const scrollOffsetPercentage = 0.2;
        if (pathname !== '/') {
            history.push('/')
            setTimeout(() => {
                const currentScrollPosition = window.scrollY;
                const targetScrollPosition = scrollTo?.current?.getBoundingClientRect().top + currentScrollPosition - (window.innerHeight * scrollOffsetPercentage);
                window.scrollTo({ top: targetScrollPosition, behavior: "smooth" });            }, 10);
        }
        const currentScrollPosition = window.scrollY;
        const targetScrollPosition = scrollTo?.current?.getBoundingClientRect().top + currentScrollPosition - (window.innerHeight * scrollOffsetPercentage);
        window.scrollTo({ top: targetScrollPosition, behavior: "smooth" });
        };

    const scrollToVeryTop = () => {
        if (pathname !== '/') {
            history.push('/')
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 10);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

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
                                    onClick={() => scrollToVeryTop()}>
                                    ORDERING
                                </label>
                            </div>
                            <div className="p-4">
                                <label
                                    htmlFor="drawer-left"
                                    className="text-2xl btn btn-sm btn-circlze btn-ghost"
                                    onClick={() => scrollToSection(scrollToFAQ)}>
                                    FAQ
                                </label>
                            </div>
                            <div className="p-4">
                                <label
                                    htmlFor="drawer-left"
                                    className="text-2xl btn btn-sm btn-circlze btn-ghost"
                                    onClick={() => scrollToSection(scrollToAbout)}
                                >
                                    ABOUT</label>
                            </div>
                            <div className="p-4">
                                <label
                                    htmlFor="drawer-left"
                                    className="text-2xl btn btn-sm btn-circlze btn-ghost"
                                    onClick={(e) => scrollToSection(scrollToGallery)}>
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
