import AboutPage from "../AboutPage"
import FaqPage from "../FaqPage"
import GalleryPage from "../GalleryPage"
import { NavLink } from "react-router-dom";


export default function LandingPage(){
    return(
        <>
        <AboutPage />
        <NavLink exact to='/order'>ORDERING</NavLink>
        <FaqPage />
        <GalleryPage />
        </>
    )
}
