import AboutPage from "../AboutPage"
import FaqPage from "../FaqPage"
import GalleryPage from "../GalleryPage"
import { NavLink } from "react-router-dom";


export default function LandingPage() {
    return (
        <div className="flex flex-col justify-center items-center">
            <AboutPage />
            <div className="mt-4"> {/* Add margin top */}
                <NavLink exact to="/order">
                    <button className="btn btn-outline-primary border-primary_blue text-primary_blue z-20">
                        START ORDERING NOW
                    </button>
                </NavLink>
            </div>
            <FaqPage />
            <GalleryPage />
        </div>
    );
}
