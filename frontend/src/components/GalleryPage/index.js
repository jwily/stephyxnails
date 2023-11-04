import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useOrderContext } from "../../context/OrderContext";

export default function GalleryPage() {
    const {scrollToGallery} = useOrderContext()
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
    const fetchButton = async() => {
        const res = await fetch('/api/exampleimages/')

        if (res.ok){
            const result = res.json()
            console.log(result);
        }
    }
    return (
        <div className="p-4" ref={scrollToGallery}>
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                <div>
                    <img src="https://mangterest-pic.s3.amazonaws.com/e0c31739011b474e9666709692cfadad.jpg" />
                </div>
                <div>
                    <img src="https://mangterest-pic.s3.amazonaws.com/5a5f64b3924f4990b576557394be0962.jpg" />
                </div>
                <div>
                    <img src="https://mangterest-pic.s3.amazonaws.com/e0c31739011b474e9666709692cfadad.jpg" />
                </div>
                <div>
                    <img src="https://mangterest-pic.s3.amazonaws.com/5a5f64b3924f4990b576557394be0962.jpg" />
                </div>
            </Carousel>

            <div>
                <button onClick={fetchButton}>Click Me</button>
            </div>
        </div>
    )
}
