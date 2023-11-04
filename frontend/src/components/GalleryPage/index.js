import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useOrderContext } from "../../context/OrderContext";
import Image from "./image";

export default function GalleryPage() {
    const {scrollToGallery, image} = useOrderContext()
    console.log(image,'what is bring brought in');
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const picture = image.map(pic => (
        <Image
            imgUrl={pic.url}
        />
    ))

    return (
        <div className="p-4" ref={scrollToGallery}>
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {picture}
            </Carousel>
        </div>
    )
}
