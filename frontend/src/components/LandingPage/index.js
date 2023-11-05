import { useOrderContext } from "../../context/OrderContext";
import AboutPage from "../AboutPage"
import FaqPage from "../FaqPage"
import GalleryPage from "../GalleryPage"
import { NavLink } from "react-router-dom";


export default function LandingPage() {
    const {scrollToOrder} = useOrderContext()
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="rounded-xl m-4 bg-primary p-4" ref={scrollToOrder}>
                <div className="text-center font-bold text-lg pb-4">
                    CUSTOM ORDERING
                </div>
                <div className="text-center pb-6 text-xl">
                    Hand painted custom press-ons, with every order made especially for you!
                </div>
                <NavLink exact to="/order">
                    <button className="btn btn-outline-primary border-none text-xl btn-block underline text-black">
                        START ORDERING NOW
                    </button>
                </NavLink>
            </div>
            <FaqPage />
            <AboutPage />
        </div>
    );
}
